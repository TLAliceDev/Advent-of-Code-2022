import scala.io.Source
import Array._

class Movement(direction: Char, amount: Int):
  def d() = direction
  def a() = amount

class Point(xp: Int, yp: Int):
  def x() = xp
  def y() = yp
  def distance(other : Point): Int = {
    val distX = (other.x() - this.x()).abs
    val distY = (other.y() - this.y()).abs
    return distX.max(distY)
  }
  def getFollow(other : Point) : Point = {
    if (other.x() == this.x()) {
      return Point(this.x(), this.y() + (other.y()-this.y()).sign)
    }
    if (other.y() == this.y()) {
      return Point(this.x() + (other.x()-this.x()).sign, this.y())
    }
      return Point(this.x() + (other.x()-this.x()).sign, this.y() + (other.y()-this.y()).sign)
  }

def readInput(): Array[Movement] =
  var arr = new Array[Movement](2000)
  var index = 0
  for (line <- Source.fromFile("input").getLines()) {
    val lineSplit = line.split(" ")
    val newMovement = Movement(lineSplit(0)(0), lineSplit(1).toInt)
    arr(index) = newMovement
    index = index + 1
  }
  return arr

def partOne(movements : Array[Movement]): Int = {
  var head = Point(0,0)
  var tail = Point(0,0)
  var count = 1
  val visitedMatrixSize = 5000
  var visitMatrix = ofDim[Boolean](visitedMatrixSize,visitedMatrixSize)
  for ( movement <- movements ) {
         for (i <- 0 until movement.a()) {
          movement.d() match {
            case 'U'=> head = Point(head.x(),head.y() + 1)
            case 'D'=> head = Point(head.x(),head.y() - 1)
            case 'L'=> head = Point(head.x() - 1,head.y())
            case 'R'=> head = Point(head.x() + 1,head.y())
          }
          if (tail.distance(head) > 1) {
            tail = tail.getFollow(head)
            if (!visitMatrix(tail.x() + visitedMatrixSize/2)(tail.y() + visitedMatrixSize/2)) {
              visitMatrix(tail.x() + visitedMatrixSize/2)(tail.y() + visitedMatrixSize/2) = true
              count += 1
            }
          }
        }
  }
  return count
}


def partTwo(movements : Array[Movement]): Int = {
  var rope = new Array[Point](10)
  for (i <- 0 until 10) {
    rope(i) = Point(0,0)
  }
  var count = 1
  val visitedMatrixSize = 5000
  var visitMatrix = ofDim[Boolean](visitedMatrixSize,visitedMatrixSize)
  for ( movement <- movements ) {
         for (i <- 0 until movement.a()) {
          val head = rope(0)
          movement.d() match {
            case 'U'=> rope(0) = Point(head.x(),head.y() + 1)
            case 'D'=> rope(0) = Point(head.x(),head.y() - 1)
            case 'L'=> rope(0) = Point(head.x() - 1,head.y())
            case 'R'=> rope(0) = Point(head.x() + 1,head.y())
          }
          for (i <- 1 until 10) {
            val tail = rope(i)
            val head = rope(i-1)
            if (tail.distance(head) > 1) {
              rope(i) = tail.getFollow(head)
              if (i == 9) {
                val tail = rope(i)
                if (!visitMatrix(tail.x() + visitedMatrixSize/2)(tail.y() + visitedMatrixSize/2)) {
                  visitMatrix(tail.x() + visitedMatrixSize/2)(tail.y() + visitedMatrixSize/2) = true
                  count += 1
                }
              }
            }
          }
        }
  }
  return count
}


@main def main(args : String*): Unit =
  val movements = readInput()
  println(partOne(movements))
  println(partTwo(movements))
