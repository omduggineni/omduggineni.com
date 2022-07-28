import sys;

input_data = open("rick.txt", "rt").read().strip().splitlines()
input_data = [line.strip().split(" ") for line in input_data]
input_data = [[line[0], " ".join(line[1:])] for line in input_data]
input_data = [[line[0].strip(), line[1].strip()] for line in input_data if (len(line) > 1 and line[1].strip() != "#")]

def translate_timestamp(timestamp):
    # hh:mm:ss.milliseconds -> # of seconds
    timestamp = timestamp.split(":")
    seconds = int(timestamp[0]) * 3600 + int(timestamp[1]) * 60 + float(timestamp[2])
    return seconds

input_data = [(translate_timestamp(a), b) for a, b in input_data]
input_data.sort(key=lambda x: x[0]) # sanity check: strictly increasing timestamps
input_data = [input_data[i:i+2] for i in range(0, len(input_data))]
input_data[-1].append((input_data[-1][0][0] + 1, "END"))

input_data = [(b[0]-a[0], a[1]) for a, b in input_data]
input_data = [[b, a] for a, b in input_data]
print(input_data)