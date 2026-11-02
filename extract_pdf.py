import PyPDF2
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

reader = PyPDF2.PdfReader(r'e:\Our-landingpage-main\SEO Plan for Nexus Dev Studio.pdf')
text = ''
for i, page in enumerate(reader.pages):
    text += f"\n=== PAGE {i+1} ===\n"
    text += page.extract_text()

with open(r'e:\Our-landingpage-main\seo_plan_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)

print("PDF extracted successfully to seo_plan_text.txt")
