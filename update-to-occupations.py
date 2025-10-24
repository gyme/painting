#!/usr/bin/env python3

import requests
import json

def update_category_production():
    """Update police-officer and astronaut to Occupations category in production"""
    backend_url = "https://docker-composeyaml-production.up.railway.app"
    
    # Get all paintings
    response = requests.get(f"{backend_url}/api/paintings", params={"page": 0, "size": 1000})
    paintings = response.json()["content"]
    
    # Find police-officer and astronaut
    to_update = []
    for painting in paintings:
        if painting["urlKey"] in ["police-officer", "astronaut"]:
            to_update.append(painting)
            print(f"Found {painting['urlKey']} (ID: {painting['id']})")
    
    # Update each one
    for painting in to_update:
        painting["category"] = "Occupations"
        response = requests.put(
            f"{backend_url}/api/paintings/{painting['id']}",
            headers={"Content-Type": "application/json"},
            json=painting
        )
        if response.status_code == 200:
            print(f"✅ Updated {painting['urlKey']} to Occupations")
        else:
            print(f"❌ Failed to update {painting['urlKey']}: {response.text}")

def update_category_local():
    """Update police-officer and astronaut to Occupations category locally"""
    backend_url = "http://localhost:8080"
    
    try:
        # Get all paintings
        response = requests.get(f"{backend_url}/api/paintings", params={"page": 0, "size": 1000})
        paintings = response.json()["content"]
        
        # Find police-officer and astronaut
        to_update = []
        for painting in paintings:
            if painting["urlKey"] in ["police-officer", "astronaut"]:
                to_update.append(painting)
                print(f"Found {painting['urlKey']} (ID: {painting['id']})")
        
        # Update each one
        for painting in to_update:
            painting["category"] = "Occupations"
            response = requests.put(
                f"{backend_url}/api/paintings/{painting['id']}",
                headers={"Content-Type": "application/json"},
                json=painting
            )
            if response.status_code == 200:
                print(f"✅ Updated {painting['urlKey']} to Occupations")
            else:
                print(f"❌ Failed to update {painting['urlKey']}: {response.text}")
    except requests.exceptions.ConnectionError:
        print("❌ Local backend not running. Skipping local update.")

if __name__ == "__main__":
    print("=== Updating Production ===")
    update_category_production()
    print("\n=== Updating Local ===")
    update_category_local()
    print("\n✅ Category updates complete!")

