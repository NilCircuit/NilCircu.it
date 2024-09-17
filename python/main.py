def generate_substrings(word):
    return [word[:i] for i in range(1, len(word) + 1)]

word = "call me chris tyson the way i be in minors dms"
substrings = generate_substrings(word)
print(substrings)