import fitz
import json
import os
import re

# Course definitions
COURSES = [
    {
        'key': '5103',
        'setKey': 'hmml5103',
        'name': 'HMML5103',
        'titleMs': 'Teori Linguistik dalam Pendidikan Bahasa Melayu',
        'titleEn': 'Linguistic Theory in Malay Language Education',
        'file': r'C:\Users\Administrator\Downloads\Adib\HMML5103 Teori Linguistik dalam Pendidikan Bahasa Melayu_eJan25.pdf',
        'lang': 'ms'
    },
    {
        'key': '5533',
        'setKey': 'hmml5533',
        'name': 'HMML5533',
        'titleMs': 'Inovasi Pedagogi dalam Pendidikan Bahasa Melayu',
        'titleEn': 'Pedagogical Innovation in Malay Language Education',
        'file': r'C:\Users\Administrator\Downloads\Adib\HMML5533 Inovasi Pedagogi dalam Pendidikan Bahasa Melayu_eJan25.pdf',
        'lang': 'ms'
    },
    {
        'key': '1303',
        'setKey': 'hpgd1303',
        'name': 'HPGD1303',
        'titleMs': 'Sejarah Pendidikan',
        'titleEn': 'History of Education',
        'file': r'C:\Users\Administrator\Downloads\Adib\HPGD1303 History of Edu_eSept26.pdf',
        'lang': 'en'
    }
]

def clean_text(text):
    # Remove OUM copyright headers/footers
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        s = line.strip()
        if re.search(r'Hak Cipta.*Open University Malaysia', s, re.I):
            continue
        if re.search(r'Copyright.*Open University Malaysia', s, re.I):
            continue
        if re.match(r'^\d+\s*$', s): # isolated page number
            continue
        if re.match(r'^TOPIK \d+\s+', s, re.I) or re.match(r'^TOPIC \d+\s+', s, re.I):
            continue
        cleaned.append(line)
    return '\n'.join(cleaned)

def extract_course(c):
    doc = fitz.open(c['file'])
    toc = doc.get_toc()
    
    # Identify topic entries (Level 2)
    topic_items = []
    for item in toc:
        level, title, page = item
        if level == 2 and ('TOPIK ' in title.upper() or 'TOPIC ' in title.upper()):
            topic_items.append({'title': title, 'page': page, 'sections': []})
        elif level == 3 and topic_items:
            topic_items[-1]['sections'].append({'title': title, 'page': page})
            
    # Calculate page ranges for each topic
    for i, t in enumerate(topic_items):
        start_p = t['page']
        end_p = topic_items[i+1]['page'] - 1 if i + 1 < len(topic_items) else len(doc)
        t['start_page'] = start_p
        t['end_page'] = end_p
        
        # Extract text across pages
        t_pages = []
        for p in range(start_p - 1, min(end_p, len(doc))):
            t_pages.append(doc[p].get_text())
        t['raw_text'] = '\n'.join(t_pages)
        t['cleaned_text'] = clean_text(t['raw_text'])
        
    print(f"Extracted {len(topic_items)} topics for {c['name']}")
    return topic_items

if __name__ == '__main__':
    all_courses_data = {}
    for c in COURSES:
        all_courses_data[c['key']] = extract_course(c)
    
    with open('scripts/extracted_meta.json', 'w', encoding='utf-8') as f:
        meta_summary = {
            k: [{'title': t['title'], 'start': t['start_page'], 'end': t['end_page'], 'sections': [s['title'] for s in t['sections']]} for t in v]
            for k, v in all_courses_data.items()
        }
        json.dump(meta_summary, f, indent=2, ensure_ascii=False)
    print("Metadata summary saved to scripts/extracted_meta.json")
