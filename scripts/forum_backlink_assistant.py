#!/usr/bin/env python3
"""
PixEnhance — Automated Forum & Backlink Finder Assistant
Searches Reddit and forums for students/users asking about photo/signature resizing,
generates tailored helpful responses with your exact PixEnhance tool link,
and allows direct commenting from the terminal or 1-click browser posting.
"""

import os
import sys
import json
import time
import webbrowser
import urllib.request
import urllib.parse
from typing import List, Dict, Optional

# Search queries targeting high-intent student & e-commerce communities
SEARCH_TOPICS = [
    # 1. Core Image Compression (TinyPNG / Lossless alternative)
    {
        "query": "compress image without losing quality OR tinypng alternative",
        "category": "Universal Image Compressor",
        "default_tool": "https://pixenhance.in/image-compressor"
    },
    {
        "query": "compress png transparent OR compress webp size",
        "category": "PNG / WebP Compression",
        "default_tool": "https://pixenhance.in/compress-png"
    },
    {
        "query": "reduce jpg size to 50kb OR 100kb free",
        "category": "Target KB Compressor",
        "default_tool": "https://pixenhance.in/compress-jpg-to-100kb"
    },

    # 2. High-Demand Format Converters
    {
        "query": "convert heic to jpg windows free OR iphone heic photos",
        "category": "HEIC to JPG Converter",
        "default_tool": "https://pixenhance.in/heic-to-jpg"
    },
    {
        "query": "convert webp to png lossless OR save webp as jpg",
        "category": "WebP to PNG/JPG Converter",
        "default_tool": "https://pixenhance.in/webp-to-png"
    },
    {
        "query": "convert jpg to png transparent background",
        "category": "JPG to PNG Converter",
        "default_tool": "https://pixenhance.in/jpg-to-png"
    },

    # 3. PDF & Document Tools
    {
        "query": "convert photos to single pdf free OR image to pdf",
        "category": "Image to PDF Converter",
        "default_tool": "https://pixenhance.in/image-to-pdf"
    },
    {
        "query": "compress pdf under 1mb OR 2mb free online",
        "category": "PDF Compressor",
        "default_tool": "https://pixenhance.in/compress-pdf"
    },

    # 4. Batch & Bulk Operations
    {
        "query": "bulk resize images free OR batch compress photos",
        "category": "Bulk Image Resizer",
        "default_tool": "https://pixenhance.in/bulk-image-resizer"
    },

    # 5. Social Media Resizers (Instagram, YouTube, WhatsApp)
    {
        "query": "resize image for instagram without cropping 1080x1080",
        "category": "Instagram Post Resizer",
        "default_tool": "https://pixenhance.in/resize-image-for-instagram"
    },
    {
        "query": "youtube thumbnail size 1280x720 resizer",
        "category": "YouTube Thumbnail Resizer",
        "default_tool": "https://pixenhance.in/resize-image-for-youtube-thumbnail"
    },
    {
        "query": "whatsapp dp full photo without crop",
        "category": "WhatsApp DP Resizer",
        "default_tool": "https://pixenhance.in/whatsapp-image-resizer"
    },

    # 6. Exam & Verification Resizers
    {
        "query": "ssc photo signature resize 20kb 50kb",
        "category": "SSC Exam Resizer",
        "default_tool": "https://pixenhance.in/ssc-cgl-photo-resizer"
    },
    {
        "query": "bpsc signature 15kb OR photo 25kb",
        "category": "BPSC Bihar Resizer",
        "default_tool": "https://pixenhance.in/bpsc-photo-resizer"
    },
    {
        "query": "neet photo 10kb to 200kb postcard size 5x7",
        "category": "NEET Exam Resizer",
        "default_tool": "https://pixenhance.in/neet-photo-resizer"
    },
    {
        "query": "dv lottery photo 240kb 600x600 checker",
        "category": "US DV Lottery Checker",
        "default_tool": "https://pixenhance.in/dv-lottery-photo-checker-resizer"
    }
]

# Targeted subreddits with active students and applicants
SUBREDDITS = [
    "JEENEETards",
    "UPSC",
    "ssc",
    "delhi",
    "india",
    "EtsySellers",
    "shopify",
    "FulfillmentByAmazon",
    "photography"
]

CONFIG_FILE = os.path.join(os.path.dirname(__file__), "reddit_config.json")

def load_reddit_credentials() -> Optional[Dict[str, str]]:
    """Loads Reddit API credentials from local config if present."""
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                if data.get("client_id") and data.get("client_id") != "YOUR_REDDIT_CLIENT_ID":
                    return data
        except Exception:
            pass
    return None

def get_reddit_oauth_token(creds: Dict[str, str]) -> Optional[str]:
    """Obtains OAuth bearer token for direct terminal posting."""
    auth_url = "https://www.reddit.com/api/v1/access_token"
    auth = urllib.request.HTTPPasswordMgrWithDefaultRealm()
    auth.add_password(None, auth_url, creds["client_id"], creds["client_secret"])
    handler = urllib.request.HTTPBasicAuthHandler(auth)
    opener = urllib.request.build_opener(handler)
    
    post_data = urllib.parse.urlencode({
        "grant_type": "password",
        "username": creds["username"],
        "password": creds["password"]
    }).encode("utf-8")
    
    req = urllib.request.Request(auth_url, data=post_data, headers={
        "User-Agent": creds.get("user_agent", "PixEnhanceAssistant/1.0")
    })
    
    try:
        with opener.open(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("access_token")
    except Exception as e:
        print(f"[-] Reddit Auth Error: {e}")
        return None

def post_reddit_comment(post_id: str, comment_text: str, token: str, user_agent: str) -> bool:
    """Posts a comment directly to a Reddit thread via OAuth API."""
    url = "https://oauth.reddit.com/api/comment"
    fullname = f"t3_{post_id}" if not post_id.startswith("t3_") else post_id
    
    post_data = urllib.parse.urlencode({
        "thing_id": fullname,
        "text": comment_text,
        "api_type": "json"
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=post_data, headers={
        "Authorization": f"bearer {token}",
        "User-Agent": user_agent,
        "Content-Type": "application/x-www-form-urlencoded"
    })
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if not data.get("json", {}).get("errors"):
                return True
            print(f"[-] API Error: {data['json']['errors']}")
            return False
    except Exception as e:
        print(f"[-] Posting Exception: {e}")
        return False

def search_reddit_posts(query: str, limit: int = 5) -> List[Dict]:
    """Searches Reddit public JSON feed for relevant student inquiries."""
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.reddit.com/search.json?q={encoded_query}&sort=new&limit={limit}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 PixEnhanceFinder/1.0"
    }
    
    req = urllib.request.Request(url, headers=headers)
    posts = []
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            children = data.get("data", {}).get("children", [])
            for child in children:
                d = child.get("data", {})
                posts.append({
                    "id": d.get("id"),
                    "title": d.get("title", ""),
                    "subreddit": d.get("subreddit_name_prefixed", ""),
                    "url": f"https://reddit.com{d.get('permalink', '')}",
                    "selftext": d.get("selftext", "")[:200],
                    "num_comments": d.get("num_comments", 0),
                    "created_utc": d.get("created_utc", 0)
                })
    except Exception as e:
        print(f"[-] Search error for '{query}': {e}")
        
    return posts

def generate_helpful_reply(post_title: str, post_text: str, default_tool: str) -> str:
    """Creates a natural, authentic, helpful response with the exact tool link."""
    title_lower = (post_title + " " + post_text).lower()
    
    # 1. General & Lossless Image Compression (TinyPNG alternative)
    if any(k in title_lower for k in ["tinypng", "compress image", "compress photo", "reduce image size", "reduce photo size"]):
        return (
            "If you want to compress images without losing quality, check out PixEnhance. "
            "It runs 100% locally in your browser (no file uploads to external servers), has no file size limits, "
            "and lets you target specific KB sizes or visual quality presets:\n"
            "https://pixenhance.in/image-compressor\n\n"
            "It handles JPG, PNG, and WebP with instant side-by-side comparison."
        )

    # 2. HEIC to JPG (iPhone on Windows)
    if any(k in title_lower for k in ["heic", "iphone photo on windows", "heif"]):
        return (
            "You can convert iPhone HEIC photos to standard high-resolution JPG directly in your browser "
            "without uploading your private photos to remote servers:\n"
            "https://pixenhance.in/heic-to-jpg\n\n"
            "Preserves full EXIF details and photo clarity with instant download."
        )

    # 3. WebP to PNG / JPG
    if any(k in title_lower for k in ["webp to png", "save webp", "convert webp"]):
        return (
            "Here is a fast in-browser converter to turn WebP files into clean, transparent PNG or JPG with lossless quality:\n"
            "https://pixenhance.in/webp-to-png\n\n"
            "No sign-up or watermarks required."
        )

    # 4. PDF Tools (Image to PDF / Compress PDF)
    if any(k in title_lower for k in ["image to pdf", "photo to pdf", "convert to pdf"]):
        return (
            "You can merge and convert multiple JPG or PNG images into a single lightweight PDF document directly in your browser:\n"
            "https://pixenhance.in/image-to-pdf\n\n"
            "Works completely client-side for confidential certificates and invoices."
        )
    if any(k in title_lower for k in ["compress pdf", "reduce pdf size"]):
        return (
            "If your PDF is too large for email or web portal uploads, this in-browser tool optimizes and compresses PDF files under 1MB or 2MB without blurring text:\n"
            "https://pixenhance.in/compress-pdf"
        )

    # 5. Bulk & Batch Image Resizing
    if any(k in title_lower for k in ["batch", "bulk resize", "multiple photos"]):
        return (
            "If you need to resize or compress multiple photos at once, PixEnhance has a free bulk image resizer that processes batches right on your computer using local browser canvas:\n"
            "https://pixenhance.in/bulk-image-resizer"
        )

    # 6. Social Media & Instagram 1080x1080
    if any(k in title_lower for k in ["instagram", "1080x1080", "post resizer"]):
        return (
            "To fit vertical or landscape photos into Instagram feed without unwanted cropping, you can use this free resizer that adds matching blurred borders or exact 1080x1080 / 1080x1350 dimensions:\n"
            "https://pixenhance.in/resize-image-for-instagram"
        )

    # 7. YouTube Thumbnail
    if any(k in title_lower for k in ["youtube thumbnail", "1280x720"]):
        return (
            "Here is a dedicated tool to scale and compress YouTube thumbnails to exact 1280x720 pixels under the 2MB YouTube upload limit:\n"
            "https://pixenhance.in/resize-image-for-youtube-thumbnail"
        )

    # 8. WhatsApp DP
    if any(k in title_lower for k in ["whatsapp dp", "profile picture no crop"]):
        return (
            "You can set full photos as WhatsApp DP without cropping friends or backgrounds using this free tool:\n"
            "https://pixenhance.in/whatsapp-image-resizer"
        )

    # 9. Exam & Government Forms
    if "ssc" in title_lower or "cgl" in title_lower or "chsl" in title_lower:
        return (
            "Bhai, tension mat lo, phone browser se hi 1 second mein ho jata hai. Maine PixEnhance ka dedicated SSC tool use kiya tha, "
            "photo 20KB-50KB aur signature 10KB-20KB exact SSC rules ke according resize ho gaya:\n"
            "https://pixenhance.in/ssc-cgl-photo-resizer\n\n"
            "Photo kisi server par upload nahi hoti to document privacy safe rehti hai."
        )
    elif "bpsc" in title_lower or "tre" in title_lower or "bihar" in title_lower:
        return (
            "BPSC ke portal par signature under 15KB (220x100 pixels) chahiye hota hai. Is free tool se directly exact size par format kar lo:\n"
            "https://pixenhance.in/bpsc-photo-resizer\n\n"
            "Hindi aur English signature dono presets pehle se configured hain."
        )
    elif "neet" in title_lower or "nta" in title_lower or "jee" in title_lower:
        return (
            "NTA forms ke liye photo 10KB se 200KB ke beech honi chahiye with 80% face coverage. Aap browser mein seedha PixEnhance se format kar sakte ho:\n"
            "https://pixenhance.in/neet-photo-resizer\n\n"
            "White background aur dimensions pehle se calibrated hain."
        )
    elif "dv" in title_lower or "lottery" in title_lower or "green card" in title_lower:
        return (
            "For the US DV Lottery, the photo must be strictly 600x600 pixels and under 240 KB in sRGB color. You can format and check your photo directly here:\n"
            "https://pixenhance.in/dv-lottery-photo-checker-resizer\n\n"
            "It checks biometric head height to prevent lottery disqualification."
        )

    return (
        "You can resize, convert, or compress your image to exact KB or pixel dimensions directly in your web browser "
        f"with this free private tool:\n{default_tool}"
    )
        
    return reply

def main():
    print("=" * 70)
    print("   PixEnhance — Smart Forum Backlink & Traffic Assistant")
    print("=" * 70)
    
    creds = load_reddit_credentials()
    token = None
    if creds:
        print(f"[*] Reddit API configured for user: {creds.get('username')}")
        token = get_reddit_oauth_token(creds)
        if token:
            print("[✓] Direct Terminal Posting: ENABLED")
        else:
            print("[!] Reddit Auth failed. Falling back to 1-Click Browser mode.")
    else:
        print("[i] Reddit API keys not configured. Running in Safe 1-Click Browser Mode.")
        print("    (To enable direct terminal posting, edit scripts/reddit_config.json)")
    
    print("\n[*] Scanning active student and applicant queries...\n" + "-" * 70)
    
    seen_posts = set()
    total_processed = 0
    
    for topic in SEARCH_TOPICS:
        print(f"\n🔍 Searching for: {topic['category']} ({topic['query']})...")
        posts = search_reddit_posts(topic["query"], limit=4)
        
        if not posts:
            print("   No recent unreplied posts found for this query.")
            continue
            
        for post in posts:
            if post["id"] in seen_posts:
                continue
            seen_posts.add(post["id"])
            total_processed += 1
            
            reply_text = generate_helpful_reply(post["title"], post["selftext"], topic["default_tool"])
            
            print("\n" + "=" * 70)
            print(f"📌 Community: {post['subreddit']}")
            print(f"❓ Question:  {post['title']}")
            print(f"🔗 URL:       {post['url']}")
            print(f"💬 Comments:  {post['num_comments']} replies currently")
            print("-" * 70)
            print("📝 Suggested Helpful Response:")
            print(reply_text)
            print("=" * 70)
            
            print("\nSelect Action:")
            if token:
                print("  [1] Post reply DIRECTLY from terminal (Reddit API)")
            print("  [2] Open post in Browser (1-Click Safe Reply)")
            print("  [3] Skip to next query")
            print("  [4] Exit")
            
            choice = input("\nEnter choice [1/2/3/4]: ").strip()
            
            if choice == "1" and token:
                print("\n[*] Submitting comment via Reddit API...")
                success = post_reddit_comment(post["id"], reply_text, token, creds.get("user_agent", "PixEnhance/1.0"))
                if success:
                    print("[✓] 200 OK! Comment successfully posted directly from terminal!")
                else:
                    print("[!] Failed to post via API. Opening in browser instead...")
                    webbrowser.open(post["url"])
            elif choice == "2" or (choice == "1" and not token):
                print(f"\n[*] Opening {post['url']} in your browser...")
                webbrowser.open(post["url"])
                print("[i] Copy the suggested response above and paste it into the comment box!")
            elif choice == "4":
                print("\n[*] Exiting. Happy ranking!")
                return
            else:
                print("[*] Skipped.")
                
            time.sleep(1)

    print("\n" + "=" * 70)
    print(f"[*] Finished scanning! Processed {total_processed} relevant discussions.")
    print("=" * 70)

if __name__ == "__main__":
    main()
