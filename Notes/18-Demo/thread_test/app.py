import threading

def thread_function(input):
    print(input)
    time.sleep(2)

print("before creating thread")
x = threading.Thread(target=thread_function, args=(1,))
print("before running thread")
x.start()
print("wait for the thread to finish")
x.join()
print("all done")