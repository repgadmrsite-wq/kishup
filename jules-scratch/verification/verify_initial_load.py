from playwright.sync_api import sync_playwright, Page, expect

def run(page: Page):
    # This script navigates to the kiosk homepage and takes a screenshot.

    # 1. Navigate to the application.
    page.goto("http://127.0.0.1:8001/index.php")

    # 2. Wait for a key element to be visible to ensure the page has loaded.
    # I'll wait for the first heading to appear.
    expect(page.locator("#app h2")).to_be_visible(timeout=10000)

    # 3. Take a screenshot for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

# This is the standard Playwright script runner boilerplate.
if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run(page)
        finally:
            browser.close()
