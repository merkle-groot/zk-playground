x = [208,163,95,101,72,111,54,93,253,216,12,215,126,220,146,68,175,201,220,188,132,203,142,228,254,92,130,116,227,103,117,37]
num = 0
mult = 0
x.reverse()
for y in x:
    num += y * (1 << mult*8);
    mult += 1


print(num)
print(hex(num))

# d0a35f65486f365dfdd80cd77edc9244afc9dcbc84cb8ee4fe5c8274e3677525

