function splitString (string, delim)
   local t={}
   for str in string.gmatch(string, "([^"..delim.."]+)") do
      table.insert(t, str)
   end
   return t
end

function readInput()
    arr = {}
    i = 1
    for line in io.lines("input") do
        spl = splitString(line," ")
        op = spl[1]
        value = spl[2]
        instruction = {}
        instruction[0] = op
        instruction[1] = tonumber(value)
        arr[i] = instruction
        i = i + 1
    end
    return arr
end

function runCycle(currentCycle, x)
    strength = 0
    horizontalP = currentCycle % 40
    dif = x+1-horizontalP
    if math.abs(dif) <= 1 then
        io.write("#")
    else
        io.write(".")
    end
    if (cycle - 20) % 40 == 0 then
        strength = x * cycle
    end
    if (horizontalP == 0) then
        io.write("\n")
    end
    cycle = cycle + 1
    return {cycle, strength}
end

function partOne(instructions)
    x = 1
    cycle = 1
    sum = 0
    for _, instruction in ipairs(instructions) do
        r = runCycle(cycle,x)
        cycle = r[1]
        sum = sum + r[2]
        if instruction[0] == "addx" then
            r = runCycle(cycle,x)
            x = x + (instruction[1])
            sum = sum + r[2]
            cycle = r[1]
        end
    end
    return sum
end

function main()
    instructions = readInput()
    print(partOne(instructions))
end

main()
