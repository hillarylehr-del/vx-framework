#!/usr/bin/env python3
"""Local dev server that mimics Vercel's cleanUrls + /guide redirect for testing."""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        if self.path == "/guide" or self.path.startswith("/guide?"):
            self.send_response(302)
            self.send_header("Location", "/downloads/vx-facilitation-guide-v1.pdf")
            self.end_headers()
            return

        path = self.path.split("?")[0]
        if path != "/" and not os.path.splitext(path)[1]:
            candidate = os.path.join(ROOT, path.lstrip("/") + ".html")
            if os.path.isfile(candidate):
                self.path = path + ".html"

        return super().do_GET()


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Serving {ROOT} at http://127.0.0.1:{PORT}")
        httpd.serve_forever()
