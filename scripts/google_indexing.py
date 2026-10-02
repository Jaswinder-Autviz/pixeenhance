"""
PixEnhance — Google Indexing API Script
Automatically submits all website tools and blog URLs to Google Search Console
for rapid indexing (usually indexed within 24-48 hours).
"""

import os
import sys
import json
import time

try:
    import requests
    from oauth2client.service_account import ServiceAccountCredentials
except ImportError:
    print("\n[!] Required libraries not installed.")
    print("Please run this command first:")
    print("    pip install requests oauth2client\n")
    sys.exit(1)

SCOPES = ["https://www.googleapis.com/auth/indexing"]
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

# File path for Google Service Account credentials JSON
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), "service_account.json")
if not os.path.exists(SERVICE_ACCOUNT_FILE):
    # Check parent folder as fallback
    SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "service_account.json")

# Core URLs to submit
BASE_URL = "https://pixenhance.in"

DEFAULT_URLS = [
    # Main Static Pages
    f"{BASE_URL}",
    f"{BASE_URL}/tools",
    f"{BASE_URL}/blog",
    f"{BASE_URL}/about",
    f"{BASE_URL}/privacy",
    f"{BASE_URL}/terms",
    f"{BASE_URL}/contact",
    
    # High-Intent Compression Tools
    f"{BASE_URL}/image-compressor",
    f"{BASE_URL}/compress-jpg",
    f"{BASE_URL}/compress-jpg-to-20kb",
    f"{BASE_URL}/compress-jpg-to-50kb",
    f"{BASE_URL}/compress-jpg-to-100kb",
    f"{BASE_URL}/compress-jpg-to-200kb",
    f"{BASE_URL}/compress-png",
    f"{BASE_URL}/compress-webp",
    f"{BASE_URL}/compress-pdf",
    
    # Resizer Tools
    f"{BASE_URL}/image-resizer",
    f"{BASE_URL}/resize-jpg",
    f"{BASE_URL}/resize-png",
    f"{BASE_URL}/resize-image-to-1080x1080",
    f"{BASE_URL}/resize-image-to-1920x1080",
    f"{BASE_URL}/resize-image-for-instagram",
    f"{BASE_URL}/instagram-post-resizer",
    f"{BASE_URL}/instagram-story-resizer",
    f"{BASE_URL}/visa-photo-resizer",
    f"{BASE_URL}/whatsapp-image-resizer",
    f"{BASE_URL}/facebook-image-resizer",
    f"{BASE_URL}/linkedin-image-resizer",
    f"{BASE_URL}/resize-image-for-youtube-thumbnail",
    f"{BASE_URL}/youtube-banner-resizer",
    
    # Converter & PDF Tools
    f"{BASE_URL}/image-converter",
    f"{BASE_URL}/jpg-to-png",
    f"{BASE_URL}/png-to-jpg",
    f"{BASE_URL}/webp-to-png",
    f"{BASE_URL}/heic-to-jpg",
    f"{BASE_URL}/image-to-pdf",
    f"{BASE_URL}/pdf-to-word",
    f"{BASE_URL}/word-to-pdf",
    f"{BASE_URL}/pdf-to-jpg",
    f"{BASE_URL}/pdf-to-png",
    
    # High-Intent SEO Blog Articles
    f"{BASE_URL}/blog/how-to-compress-image-to-20kb",
    f"{BASE_URL}/blog/reduce-jpg-size-without-losing-quality",
    f"{BASE_URL}/blog/resize-image-for-instagram",
    f"{BASE_URL}/blog/resize-photo-for-passport",
    f"{BASE_URL}/blog/convert-png-to-jpg",
    f"{BASE_URL}/blog/convert-heic-to-jpg-on-windows",
    f"{BASE_URL}/blog/convert-image-to-pdf",
    f"{BASE_URL}/blog/reduce-pdf-size",
    f"{BASE_URL}/blog/a4-photo-size-in-pixels",
    f"{BASE_URL}/blog/passport-photo-size-in-pixels",
    f"{BASE_URL}/blog/how-to-compress-image-to-50kb",
    f"{BASE_URL}/blog/how-to-compress-image-to-100kb",
    f"{BASE_URL}/blog/how-to-resize-signature-online",
    f"{BASE_URL}/blog/best-image-format-png-vs-jpg-vs-webp",
    f"{BASE_URL}/blog/how-to-resize-image-for-youtube-thumbnail",
    f"{BASE_URL}/blog/pan-card-photo-signature-resize-guide",
    f"{BASE_URL}/blog/ssc-photo-and-signature-resizer-guide",
    f"{BASE_URL}/blog/how-to-convert-pdf-to-word-free",
    f"{BASE_URL}/blog/whatsapp-dp-size-and-dimensions",
    f"{BASE_URL}/blog/facebook-cover-photo-size-guide",
    f"{BASE_URL}/blog/linkedin-banner-and-profile-size",
    f"{BASE_URL}/blog/dpi-vs-ppi-explained-for-print",
    f"{BASE_URL}/blog/how-to-batch-compress-images-fast",
    f"{BASE_URL}/blog/how-to-make-transparent-png-background",
    f"{BASE_URL}/blog/fix-blurry-image-after-uploading",
    f"{BASE_URL}/blog/convert-webp-to-png-lossless",
    f"{BASE_URL}/blog/compress-image-for-email-attachment",
    f"{BASE_URL}/blog/how-to-convert-svg-to-png-high-res",
    f"{BASE_URL}/blog/how-to-crop-image-to-circle",
    f"{BASE_URL}/blog/how-to-split-image-for-instagram-grid",
    f"{BASE_URL}/blog/how-to-convert-word-to-pdf-cleanly",
    f"{BASE_URL}/blog/how-to-extract-images-from-pdf",
]


def load_urls():
    """Load URLs from urls.txt if present, otherwise use DEFAULT_URLS."""
    urls_file = os.path.join(os.path.dirname(__file__), "urls.txt")
    if os.path.exists(urls_file):
        with open(urls_file, "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f if line.strip() and not line.startswith("#")]
            if lines:
                return lines
    return DEFAULT_URLS


def submit_url(url, http_client):
    """Publish a single URL to Google Indexing API."""
    content = {
        "url": url,
        "type": "URL_UPDATED"
    }
    response = http_client.post(ENDPOINT, json=content)
    return response.status_code, response.text


def main():
    print("=" * 60)
    print("  PixEnhance — Google Indexing API Fast Submitter")
    print("=" * 60)

    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"\n[!] ERROR: '{SERVICE_ACCOUNT_FILE}' not found!")
        print("Steps to get this file:")
        print("1. Go to Google Cloud Console -> Create a Service Account")
        print("2. Create and download the JSON key as 'service_account.json'")
        print("3. Place 'service_account.json' in this folder:\n   ", os.path.dirname(__file__))
        print("4. Add the Service Account email as 'Owner' in Google Search Console\n")
        return

    print(f"\n[*] Authenticating using {SERVICE_ACCOUNT_FILE}...")
    credentials = ServiceAccountCredentials.from_json_keyfile_name(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    http_client = requests.Session()
    
    # Get auth token
    auth_token = credentials.get_access_token().access_token
    http_client.headers.update({
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    })

    urls = load_urls()
    print(f"[*] Found {len(urls)} URLs to submit to Googlebot.")
    print("-" * 60)

    success_count = 0
    fail_count = 0

    for idx, url in enumerate(urls, 1):
        try:
            status_code, response_text = submit_url(url, http_client)
            if status_code == 200:
                print(f"[{idx}/{len(urls)}] [200 OK] Submitted: {url}")
                success_count += 1
            else:
                print(f"[{idx}/{len(urls)}] [{status_code}] Error: {url} -> {response_text[:80]}")
                fail_count += 1
        except Exception as e:
            print(f"[{idx}/{len(urls)}] [FAILED] {url}: {e}")
            fail_count += 1
        
        # Polite delay to stay within Google quota
        time.sleep(0.5)

    print("-" * 60)
    print(f"[*] Done! Successfully submitted: {success_count} | Failed: {fail_count}")
    print("[*] Googlebot will now crawl and index these pages rapidly.")
    print("=" * 60)


if __name__ == "__main__":
    main()
