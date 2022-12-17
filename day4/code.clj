(defn parse-int [string]
  (Integer/parseInt string))

(defn complete-overlap? [s1 e1 s2 e2]
  (or (and (>= s1 s2) (<= e1 e2)) (and (>= s2 s1) (<= e2 e1))))

(defn any-overlap? [s1 e1 s2 e2]
  (or (and (>= s1 s2) (<= s1 e2)) (and (>= s2 s1) (<= s2 e1))))

(defn split-line [line]
  (clojure.string/split line #",|-"))

(defn check-line-1 [line]
  (apply complete-overlap? (map parse-int (split-line line))))

(defn check-line-2 [line]
  (apply any-overlap? (map parse-int (split-line line))))

(defn solve [inputs part]
  (count 
    (filter identity (map (if (== 2 part) check-line-2 check-line-1) inputs))))

(with-open [reader (clojure.java.io/reader "input")]
  (let [inputs (line-seq reader)]
    (println (solve inputs 1))
    (println (solve inputs 2))))
