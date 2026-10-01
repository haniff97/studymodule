import fitz
import json

def get_topic_sections(pdf_path):
    doc = fitz.open(pdf_path)
    toc = doc.get_toc()
    topics = []
    current_topic = None
    for item in toc:
        level, title, page = item
        if level == 2 and ('TOPIK ' in title.upper() or 'TOPIC ' in title.upper()):
            current_topic = {'title': title, 'page': page, 'sections': []}
            topics.append(current_topic)
        elif level == 3 and current_topic:
            current_topic['sections'].append({'title': title, 'page': page})
    return topics

for name, path in [
    ('HMML5103', r'C:\Users\Administrator\Downloads\Adib\HMML5103 Teori Linguistik dalam Pendidikan Bahasa Melayu_eJan25.pdf'),
    ('HMML5533', r'C:\Users\Administrator\Downloads\Adib\HMML5533 Inovasi Pedagogi dalam Pendidikan Bahasa Melayu_eJan25.pdf'),
    ('HPGD1303', r'C:\Users\Administrator\Downloads\Adib\HPGD1303 History of Edu_eSept26.pdf')
]:
    print(f'=== {name} Topics and Sections ===')
    ts = get_topic_sections(path)
    for t in ts:
        print(f"{t['title']} (p. {t['page']})")
        for s in t['sections'][:6]:
            print(f"   - {s['title']} (p. {s['page']})")
        if len(t['sections']) > 6:
            print(f"   ... and {len(t['sections'])-6} more sections")
    print()
