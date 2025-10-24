#!/usr/bin/env python3
"""
Automatically import generated coloring pages to database
Reads from CSV and creates database entries via API
"""

import pandas as pd
import requests
import time
import json
from pathlib import Path

class DatabaseImporter:
    def __init__(self, api_url='http://localhost:8080/api/paintings', csv_file='coloring_page_prompts.csv'):
        self.api_url = api_url
        self.csv_file = csv_file
        self.success_count = 0
        self.failure_count = 0
        self.failures = []
        
    def check_image_exists(self, url_key):
        """Check if image file exists"""
        image_paths = [
            f'../frontend/public/coloring-images/{url_key}.png',
            f'processed_images/{url_key}.png',
            f'final_images/{url_key}.png',
        ]
        
        for path in image_paths:
            if Path(path).exists():
                return True
        return False
    
    def create_painting_entry(self, row):
        """Create a single painting entry in database"""
        url_key = row['URL Key']
        
        # Check if image exists
        if not self.check_image_exists(url_key):
            print(f"  ⚠️ Warning: Image file not found for {url_key}")
        
        # Prepare data
        painting_data = {
            "title": row['Title'],
            "urlKey": url_key,
            "description": row['Description'],
            "category": row['Category'],
            "difficulty": int(row['Difficulty']),
            "imageUrl": f"/coloring-images/{url_key}.png",
            "featured": False,
            "viewCount": 0,
            "tags": row['Tags'],
            "ageGroup": "4-10",
            "printable": True
        }
        
        try:
            response = requests.post(self.api_url, json=painting_data, timeout=10)
            
            if response.status_code in [200, 201]:
                print(f"  ✅ Added: {url_key}")
                self.success_count += 1
                return True
            else:
                error_msg = response.text[:100]
                print(f"  ❌ Failed: {url_key} - Status {response.status_code}: {error_msg}")
                self.failures.append({
                    'url_key': url_key,
                    'status': response.status_code,
                    'error': error_msg
                })
                self.failure_count += 1
                return False
                
        except requests.exceptions.ConnectionError:
            print(f"  ❌ Connection Error: Cannot connect to {self.api_url}")
            print(f"     Make sure your backend is running!")
            self.failures.append({
                'url_key': url_key,
                'status': 'connection_error',
                'error': 'Backend not reachable'
            })
            self.failure_count += 1
            return False
            
        except Exception as e:
            print(f"  ❌ Error: {url_key} - {str(e)}")
            self.failures.append({
                'url_key': url_key,
                'status': 'exception',
                'error': str(e)
            })
            self.failure_count += 1
            return False
    
    def import_batch(self, start_idx=0, batch_size=None, delay=0.5):
        """Import coloring pages from CSV to database"""
        print("\n💾 Database Import Tool")
        print("=" * 60)
        
        # Check if backend is accessible
        try:
            health_check = requests.get(self.api_url.replace('/paintings', '/health'), timeout=5)
            print("✅ Backend is reachable")
        except:
            print("⚠️ Warning: Cannot reach backend - make sure it's running!")
            print(f"   Expected URL: {self.api_url}")
            response = input("   Continue anyway? (y/n): ")
            if response.lower() != 'y':
                return
        
        # Load CSV
        try:
            df = pd.read_csv(self.csv_file)
            print(f"📄 Loaded: {self.csv_file}")
            print(f"📊 Total entries: {len(df)}")
        except FileNotFoundError:
            print(f"❌ Error: {self.csv_file} not found")
            print("   Run generate_prompts.py first to create the CSV file")
            return
        
        # Determine batch
        if batch_size:
            end_idx = min(start_idx + batch_size, len(df))
            df = df.iloc[start_idx:end_idx]
            print(f"📦 Processing batch: {start_idx} to {end_idx}")
        else:
            print(f"📦 Processing all entries")
        
        print()
        
        # Process each entry
        for idx, row in df.iterrows():
            self.create_painting_entry(row)
            
            # Rate limiting
            if delay > 0:
                time.sleep(delay)
            
            # Progress update every 10 entries
            if (idx + 1) % 10 == 0:
                print(f"   Progress: {idx + 1}/{len(df)} ({(idx+1)/len(df)*100:.1f}%)")
        
        # Summary
        print("\n" + "=" * 60)
        print(f"✨ Import Complete!")
        print(f"   ✅ Successful: {self.success_count}")
        print(f"   ❌ Failed: {self.failure_count}")
        print(f"   📊 Success Rate: {self.success_count/(self.success_count+self.failure_count)*100:.1f}%")
        
        if self.failures:
            print(f"\n⚠️ Failed Imports:")
            for failure in self.failures[:10]:  # Show first 10
                print(f"   • {failure['url_key']}: {failure['error']}")
            if len(self.failures) > 10:
                print(f"   ... and {len(self.failures) - 10} more")
            
            # Save failures to file
            failures_file = 'import_failures.json'
            with open(failures_file, 'w') as f:
                json.dump(self.failures, f, indent=2)
            print(f"\n   Saved all failures to: {failures_file}")
        
        print("\n🎉 Database import complete!")
        print("\n🚀 Next Steps:")
        print("1. Check your database for new entries")
        print("2. Deploy to production")
        print("3. Test on live site")

def main():
    """Main execution"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Import coloring pages to database')
    parser.add_argument('--api-url', 
                       default='http://localhost:8080/api/paintings',
                       help='Backend API URL')
    parser.add_argument('--csv', 
                       default='coloring_page_prompts.csv',
                       help='CSV file with painting data')
    parser.add_argument('--start', type=int, default=0,
                       help='Start index for batch processing')
    parser.add_argument('--batch-size', type=int,
                       help='Number of entries to process')
    parser.add_argument('--delay', type=float, default=0.5,
                       help='Delay between requests (seconds)')
    
    args = parser.parse_args()
    
    importer = DatabaseImporter(args.api_url, args.csv)
    importer.import_batch(args.start, args.batch_size, args.delay)

if __name__ == '__main__':
    main()

