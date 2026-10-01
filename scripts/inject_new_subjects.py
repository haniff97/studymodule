import json
import os

# Load generated data
with open('scripts/hmml5103_data.json', encoding='utf-8') as f:
    d5103 = json.load(f)

with open('scripts/hmml5533_data.json', encoding='utf-8') as f:
    d5533 = json.load(f)

with open('scripts/hpgd1303_data.json', encoding='utf-8') as f:
    d1303 = json.load(f)

# 1. Update src/data/real/real-notes.js
notes_path = 'src/data/real/real-notes.js'
with open(notes_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if already injected
if "'5103':" not in content:
    idx = content.rfind('};')
    if idx != -1:
        addition = f",\n  '1303': {json.dumps(d1303['notes'], ensure_ascii=False, indent=2)},\n  '5103': {json.dumps(d5103['notes'], ensure_ascii=False, indent=2)},\n  '5533': {json.dumps(d5533['notes'], ensure_ascii=False, indent=2)}\n"
        new_content = content[:idx] + addition + content[idx:]
        with open(notes_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated real-notes.js")
    else:
        print("Error: Could not find closing }; in real-notes.js")
else:
    print("real-notes.js already contains 5103")

# 2. Update src/data/real/real-quizzes.js
quizzes_path = 'src/data/real/real-quizzes.js'
with open(quizzes_path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'5103':" not in content:
    idx = content.rfind('};')
    if idx != -1:
        addition = f",\n  '1303': {json.dumps(d1303['quizzes'], ensure_ascii=False, indent=2)},\n  '5103': {json.dumps(d5103['quizzes'], ensure_ascii=False, indent=2)},\n  '5533': {json.dumps(d5533['quizzes'], ensure_ascii=False, indent=2)}\n"
        new_content = content[:idx] + addition + content[idx:]
        with open(quizzes_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated real-quizzes.js")
    else:
        print("Error: Could not find closing }; in real-quizzes.js")
else:
    print("real-quizzes.js already contains 5103")

# 3. Update src/data/real/real-flashcards.js
fc_path = 'src/data/real/real-flashcards.js'
with open(fc_path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'5103':" not in content:
    idx = content.rfind('};')
    if idx != -1:
        addition = f",\n  '1303': {json.dumps(d1303['flashcards'], ensure_ascii=False, indent=2)},\n  '5103': {json.dumps(d5103['flashcards'], ensure_ascii=False, indent=2)},\n  '5533': {json.dumps(d5533['flashcards'], ensure_ascii=False, indent=2)}\n"
        new_content = content[:idx] + addition + content[idx:]
        with open(fc_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated real-flashcards.js")
    else:
        print("Error: Could not find closing }; in real-flashcards.js")
else:
    print("real-flashcards.js already contains 5103")

# 4. Update src/data/real/real-questions.js
q_path = 'src/data/real/real-questions.js'
with open(q_path, 'r', encoding='utf-8') as f:
    content = f.read()

if '"hmml5103":' not in content:
    idx = content.rfind('};')
    if idx != -1:
        addition = f",\n \"hpgd1303\": {json.dumps(d1303['sets'], ensure_ascii=False, indent=1)},\n \"hmml5103\": {json.dumps(d5103['sets'], ensure_ascii=False, indent=1)},\n \"hmml5533\": {json.dumps(d5533['sets'], ensure_ascii=False, indent=1)}\n"
        new_content = content[:idx] + addition + content[idx:]
        with open(q_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated real-questions.js")
    else:
        print("Error: Could not find closing }; in real-questions.js")
else:
    print("real-questions.js already contains hmml5103")

print("All real data injected successfully!")
