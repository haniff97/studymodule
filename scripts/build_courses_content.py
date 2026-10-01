import fitz
import json
import re
import os

def clean_block(text):
    text = re.sub(r'Hak Cipta\s*©\s*Open University Malaysia.*', '', text)
    text = re.sub(r'Copyright\s*©\s*Open University Malaysia.*', '', text)
    text = re.sub(r'^\s*\d+\s*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def extract_pdf_data(pdf_path, is_topic_prefix='TOPIK'):
    doc = fitz.open(pdf_path)
    toc = doc.get_toc()
    
    topics = []
    for item in toc:
        level, title, page = item
        if level == 2 and is_topic_prefix.upper() in title.upper():
            topics.append({
                'raw_title': title,
                'page': page,
                'sections_toc': []
            })
        elif level == 3 and topics:
            topics[-1]['sections_toc'].append({'title': title, 'page': page})
            
    for i, t in enumerate(topics):
        start_p = t['page']
        end_p = topics[i+1]['page'] - 1 if i + 1 < len(topics) else len(doc)
        t['start_page'] = start_p
        t['end_page'] = end_p
        
        pages_text = []
        for p in range(start_p - 1, min(end_p, len(doc))):
            pages_text.append(doc[p].get_text())
        t['full_text'] = clean_block('\n'.join(pages_text))
        
    return topics

print("Helper ready")
