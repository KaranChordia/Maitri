with open('src/character-page.css', 'a') as f:
    f.write("\n\n@keyframes dashboardPopIn {\n  from { opacity: 0; transform: translateY(20px) scale(0.98); }\n  to { opacity: 1; transform: translateY(0) scale(1); }\n}\n")
    f.write("\n@keyframes modalPopIn {\n  from { opacity: 0; transform: translateY(20px) scale(0.95); }\n  to { opacity: 1; transform: translateY(0) scale(1); }\n}\n")
print("Keyframes added.")
