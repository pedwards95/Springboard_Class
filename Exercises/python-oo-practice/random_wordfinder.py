from wordfinder import WordFinder
import random

class RandomWordFinder:
    def __init__(self,file="newwordlist.txt"):
        self.file = file
        self.line_list = open(file,"r").read().splitlines()
        self.internal_dict = {}
        current_word = ''
        for index in range(len(self.line_list)):
            if self.line_list[index].strip() == "":
                continue
            elif self.line_list[index].strip()[0] == "#":
                current_word = self.line_list[index].strip()[1:len(self.line_list[index])].strip()
            elif isinstance(self.internal_dict.get(current_word),list):
                self.internal_dict[current_word].append(self.line_list[index].strip())
            else:
                self.internal_dict[current_word] = [self.line_list[index].strip()]
        print(f"{self.words_in_list()} words read.")
    
    def __repr__(self):
        return f"""RandomWordFinder(file="{self.file}")"""
    
    def random(self):
        key = (random.choice(list(self.internal_dict)))
        return random.choice(self.internal_dict[key])

    def words_in_list(self):
        keys = list(self.internal_dict)
        total = 0
        for key in keys:
            for val in self.internal_dict[key]:
                total = total+1
                val
        return total
