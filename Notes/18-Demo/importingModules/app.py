from random import choice


print("Let's play",choice([4,6,8,10]))

import calendar

cal = calendar.TextCalendar()
print(cal)
print(cal.prmonth(2025,4))
print(calendar.HTMLCalendar().formatmonth(2020,3))

import webbrowser
url = 'http://docs.python.org/'
webbrowser.open_new_tab(url)