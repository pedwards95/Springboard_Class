import random


class WordFinder:
    """Word Finder: finds random words from a dictionary."""
    def __init__(self,file="words.txt"):
        self.file = file
        self.word_list = open(file,"r").read().splitlines()
        print(f"{self.words_in_list()} words read.")
    
    def random(self):
        return random.choice(self.word_list)

    def words_in_list(self):
        return len(self.word_list)

        
