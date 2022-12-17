def calculate_scorep1(l):
    score = 0
    opponent = ord(l[0])
    you = ord(l[2]) - 23
    choice_score = you - 64
    result = you-opponent
    score += choice_score
    if result == 0:
        score += 3
    elif result != -1 and result != 2:
        score += 6
    return score

def calculate_scorep2(l):
    options = [[3,1,2],
               [1,2,3],
               [2,3,1]]
    score = 0
    opponent = ord(l[0])-65
    wdl = (ord(l[2]) - 88)
    score += wdl*3
    score += options[opponent][wdl]
    return score

f = open("input")
l = f.readline()
scorep1 = 0
scorep2 = 0
while l:
    scorep1 += calculate_scorep1(l)
    scorep2 += calculate_scorep2(l)
    l = f.readline()
print(scorep1, scorep2)
