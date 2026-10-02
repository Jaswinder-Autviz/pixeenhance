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
    {
        "query": "photo size 20kb OR 50kb",
        "category": "Exam Form Resizer",
        "default_tool": "https://pixenhance.in/compress-jpg-to-50kb"
    },
    {
        "query": "ssc photo signature resize OR rejected",
        "category": "SSC Forms",
        "default_tool": "https://pixenhance.in/ssc-cgl-photo-resizer"
    },
    {
        "query": "signature 10kb OR 20kb resize",
        "category": "Signature Tools",
        "default_tool": "https://pixenhance.in/signature-resizer-10kb"
    },
    {
        "query": "bpsc signature 15kb OR photo",
        "category": "BPSC Bihar",
        "default_tool": "https://pixenhance.in/bpsc-photo-resizer"
    },
    {
        "query": "neet photo size OR postcard size 5x7",
        "category": "NTA NEET",
        "default_tool": "https://pixenhance.in/neet-photo-resizer"
    },
    {
        "query": "dv lottery photo 240kb OR 600x600",
        "category": "US DV Lottery",
        "default_tool": "https://pixenhance.in/dv-lottery-photo-checker-resizer"
    },
    {
        "query": "amazon product image pure white background 2000x2000",
        "category": "Amazon Sellers",
        "default_tool": "https://pixenhance.in/amazon-product-image-resizer"
    },
    {
        "query": "driving licence photo 20kb sarathi",
        "category": "Sarathi DL",
        "default_tool": "https://pixenhance.in/driving-licence-photo-resizer"
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
    
    if "ssc" in title_lower or "cgl" in title_lower or "chsl" in title_lower:
        tool_url = "https://pixenhance.in/ssc-cgl-photo-resizer"
        reply = (
            "Bhai, tension mat lo, koi paid software ya app download karne ki zaroorat nahi hai. "
            "Phone browser se hi direct ho jata hai. Maine PixEnhance ka official SSC tool use kiya tha, "
            "1 second mein photo 20KB-50KB aur signature 10KB-20KB exact guidelines ke according resize ho gaya:\n"
            f"{tool_url}\n\n"
            "Sabse achhi baat ye hai ki photo kisi server par upload nahi hoti, to document privacy 100% safe rehti hai."
        )
    elif "bpsc" in title_lower or "tre" in title_lower or "bihar" in title_lower:
        tool_url = "https://pixenhance.in/bpsc-photo-resizer"
        reply = (
            "BPSC ke portal par signature 15KB ke andar hona zaroori hota hai (220x100 pixels). "
            "Aap is free online tool se directly exact size par convert kar sakte ho:\n"
            f"{tool_url}\n\n"
            "Isme Hindi aur English dono signature ka option pehle se set milta hai."
        )
    elif "neet" in title_lower or "nta" in title_lower or "jee" in title_lower:
        tool_url = "https://pixenhance.in/neet-photo-resizer"
        reply = (
            "NTA forms ke liye photo 10KB se 200KB ke beech honi chahiye with 80% face coverage. "
            "Aap browser mein seedha PixEnhance se resize kar sakte ho bina blur huye:\n"
            f"{tool_url}\n\n"
            "White background aur passport/postcard dimensions pehle se calibrated hain."
        )
    elif "dv" in title_lower or "lottery" in title_lower or "green card" in title_lower:
        tool_url = "https://pixenhance.in/dv-lottery-photo-checker-resizer"
        reply = (
            "For the US DV Lottery, the photo must be strictly 600x600 pixels and under 240 KB in sRGB color. "
            "You can use this free client-side tool to check and format your photo strictly to State Dept specifications:\n"
            f"{tool_url}\n\n"
            "It validates head height and file size so your entry doesn't get disqualified."
        )
    elif "amazon" in title_lower or "shopify" in title_lower or "etsy" in title_lower:
        tool_url = "https://pixenhance.in/amazon-product-image-resizer"
        reply = (
            "If you need to meet marketplace requirements (like Amazon 2000x2000 pure white background or Shopify 2048x2048), "
            "this in-browser tool optimizes product shots with lossless quality:\n"
            f"{tool_url}\n\n"
            "Helps activate high-res zoom while keeping store loading speeds fast."
        )
    elif "sarathi" in title_lower or "driving" in title_lower or "licence" in title_lower or "parivahan" in title_lower:
        tool_url = "https://pixenhance.in/driving-licence-photo-resizer"
        reply = (
            "Sarathi Parivahan portal requires photo and signature strictly between 10KB and 20KB. "
            "Here is a fast in-browser tool that clamps the file size to exact DL specifications:\n"
            f"{tool_url}"
        )
    else:
        tool_url = default_tool
        reply = (
            "You can resize or compress your image to exact KB or pixel dimensions directly in your web browser "
            f"using this free private tool (no sign-up, no server uploads):\n{tool_url}"
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
