package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type operator func(uint64) uint64

type monkey struct {
	items  []uint64
	op     operator
	test   uint64
	trueR  uint64
	falseR uint64
	count  uint64
}

func defaultOp(old uint64) (result uint64) {
	return old
}

func removeFromSlice(slice []uint64, i uint64) []uint64 {
	copy(slice[i:], slice[i+1:])
	slice[len(slice)-1] = 0
	return slice[:len(slice)-1]
}

func readInput() (result []monkey) {
	file, _ := os.Open("input")

	fileScanner := bufio.NewScanner(file)
	fileScanner.Split(bufio.ScanLines)

	var currentMonkey monkey

	for fileScanner.Scan() {
		line := fileScanner.Text()
		if strings.HasPrefix(line, "Monkey") {
			currentMonkey = monkey{}
			continue
		}
		if strings.HasPrefix(line, "  Starting items: ") {
			line = strings.TrimPrefix(line, "  Starting items: ")
			items := strings.Split(line, ", ")
			for _, st := range items {
				num, _ := strconv.Atoi(st)
				currentMonkey.items = append(currentMonkey.items, uint64(num))
			}
			continue
		}
		if strings.HasPrefix(line, "  Operation: new = old") {
			line = strings.TrimPrefix(line, "  Operation: new = old ")
			separated := strings.Split(line, " ")
			operation := separated[0]
			operand := separated[1]
			num, err := strconv.Atoi(operand)
			numbig := uint64(num)
			currentMonkey.op = func(old uint64) uint64 {
				if err == nil {
					switch operation {
					case "+":
						return old + numbig
					case "-":
						return old - numbig
					case "*":
						return old * numbig
					case "/":
						return old / numbig
					}
				}
				switch operation {
				case "+":
					return old + old
				case "-":
					return old - old
				case "*":
					return old * old
				case "/":
					return old / old
				}
				return old
			}
		}
		if strings.HasPrefix(line, "  Test: divisible by ") {
			line = strings.TrimPrefix(line, "  Test: divisible by ")
			num, _ := strconv.Atoi(line)
			currentMonkey.test = uint64(num)
			continue
		}
		if strings.HasPrefix(line, "    If true: throw to monkey ") {
			line = strings.TrimPrefix(line, "    If true: throw to monkey ")
			num, _ := strconv.Atoi(line)
			currentMonkey.trueR = uint64(num)
			continue
		}
		if strings.HasPrefix(line, "    If false: throw to monkey ") {
			line = strings.TrimPrefix(line, "    If false: throw to monkey ")
			num, _ := strconv.Atoi(line)
			currentMonkey.falseR = uint64(num)
			continue
		}
		if len(line) == 0 {
			result = append(result, currentMonkey)
		}
	}
	result = append(result, currentMonkey)

	file.Close()

	return result
}

func common(monkeys []monkey) uint64 {
	c := uint64(1)
	for _, m := range monkeys {
		c *= m.test
	}
	return c
}

func turn(m *monkey, monkeys *[]monkey, f func(uint64) uint64) {
	for len(m.items) > 0 {
		m.count++
		i := uint64(0)
		o := m.items[i]
		o = m.op(o)
		o = f(o)
		m.items[i] = o
		if o%m.test == 0 {
			(*monkeys)[m.trueR].items = append((*monkeys)[m.trueR].items, o)
			m.items = removeFromSlice(m.items, i)
		} else {
			(*monkeys)[m.falseR].items = append((*monkeys)[m.falseR].items, o)
			m.items = removeFromSlice(m.items, i)
		}
	}
}

func partOne(monkeys []monkey) uint64 {
	for i := 0; i < 20; i++ {
		for m, _ := range monkeys {
			turn(&monkeys[m], &monkeys, func(o uint64) uint64 { return o / 3 })
		}
	}

	sort.Slice(monkeys, func(i, j int) bool {
		return monkeys[i].count > monkeys[j].count
	})

	return monkeys[0].count * monkeys[1].count
}

func partTwo(monkeys []monkey) uint64 {
	c := common(monkeys)
	f := func(o uint64) uint64 {
		return o % c
	}

	for i := 0; i < 10000; i++ {
		for m, _ := range monkeys {
			turn(&monkeys[m], &monkeys, f)
		}
	}

	sort.Slice(monkeys, func(i, j int) bool {
		return monkeys[i].count > monkeys[j].count
	})

	return monkeys[0].count * monkeys[1].count

}

func main() {
	monkeys := readInput()
	fmt.Println(partOne(monkeys))
	monkeys = readInput()
	fmt.Println(partTwo(monkeys))
}
