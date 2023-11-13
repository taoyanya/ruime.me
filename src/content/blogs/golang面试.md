---
title: "Golang面试"
date: 2023-03-10
---

## 基础

### 同时声明多个变量

```go
var x,y = 1,2

a,b := 1, "s"

var (
  m int
  n string
)

m, n = 2, "t"
```

### Go 中的引用类型

> ​ slice、map、chan

### 静态语言与动态语言

静态语言：在编译时确定变量类型

动态语言：在运行时确定变量类型

### 结构体不加`json tag`，会有什么影响

1、如果变量为首字母小写，则为 private 变量，不能进行转换，不能取到反射信息，外界不能读取，

2、如果变量为首字母大写，则为 public 变量。

- 如果不加 tag，可以正常转换 json 里的字段，但是与原结构体保持一致
- 如果加了 tag，json 里的字段名为 tag 的字段名

### 对已经关闭的`chan`进行读写

1、对已经关闭的`chan`进行读，能读取到内容，但是要根据通道的内容来判断

- 如果通道在关闭前还有内容，会正确的读取到内容，同时第二个值为 true
- 如果通道在关闭前没有内容，将会返回零值，如：int 类型返回 0，第二个值为 false

2、对已经关闭的`chan`进行写，将会`panic`

### 获取结构体的`tag`

```go
type Target struct {
  A string `json:"a"`
  B string `json:"b"`
  C string `json:"c"`
}

func main() {
  target := &Target{
    A: "1",
    B: "2",
    C: "3",
  }
  printTag(target)
}

func printTag(raw interface{}) {
  // 获取原结构体
  stru := reflect.TypeOf(raw).Elem()
  for i := 0;i<stru.NumField();i++ {
    // 获取结构体的字段名
    name := stru.Field(i).Name
    // 获取tag的值
    json := stru.Field(i).Tag.Get("json")
  }
}
```

### `defer`关键字的使用

1、延迟调用：在当前函数执行完成调用后执行

2、后进先出(栈)：存在多个 defer 函数时，执行顺序为先进后出

### `defer`与`return`的执行顺序

```go
func fn1() (r int) {
  defer func(){
    r++
  }()
  return 0
}

func fn2() (r int) {
  t := 5
  defer func() {
    t = t + 5
  }()
  return t
}

func fn3() (r int) {
  defer func() {
    r = r + 5
  }(r)
  return 0
}

func main() {
  fmt.Println(fn1()) // 1
  fmt.Println(fn2()) // 5
  fmt.Println(fn3()) // 0
}
```

`return`关键字不是一个原子操作，是先进行赋值，再进行返回

函数 fn1 中，执行顺序为：`r=0` -> `r++` -> `ret 1`。

函数 fn2 中，执行顺序为：`t=5` -> `t = t + 5` -> `ret 5`。

函数 fn3 中，执行顺序为：`r=0` -> `r = r + 5` -> `ret 0`，与 fn1 不同的是，fn1 是对原有的 r 进行了修改，但是 fn3 中是进行值传递，也就是`defer`函数中进行值拷贝。

### `defer`的应用场景

1、资源释放。例如进行文件操作时，打开文件后，文件的关闭操作

```go
func main() {
  file, _ := os.Open("defer.txt")
  defer file.Close()
  // ...
}
```

2、错误恢复。`golang`中不存在`try cathch`。当发生错误会让程序停止运行，就可以使用`recover`配合`defer`来恢复

```go
func main() {
  defer func(){
    if ok := recover; ok != nil {
      fmt.Println("recover")
    }
  }()
  panic("err")
}
```

### `Golang`实现单例模式

1、懒汉模式：

```go
type Single struct {
  curret time.Time
}

var instance *Single
var lock sync.Mutex

func GetInstance() {
  lock.Lock()

  if instance == nil {
    instance = &Single{
      current: time.Now()
    }
  }

  lock.Unlock()

  return instance
}
```

2、饿汉模式

```go
type Single struct {
  curret time.Time
}

var instance *Single = &single{
  current: time.Now()
}
var lock sync.Mutex
```

### 两个协程交替打印内容

```go
func main() {
  wg := sync.WaitGroup{}
  ch1 := make(int, 1)
  ch2 := make(int)
  wg.Add(2)

  go func(){
    defer wg.Done()
    for i:=1;i<10;i++{
      <-ch1
      fmt.Println("ch1")
      ch2 <- 1
    }
  }()

  go func(){
    defer wg.Done()
    for i:=1;i<10;i++ {
      <-ch2
      fmt.Println("ch2")
    }
    ch1<-1
  }

  wg.Wait()
}
```

### 实现闭包

```go
func Fn(name string) func(age string) {
  return func(age string) {
    fmt.Println("name: ", name, "age: ", age)
  }
}
```

### 实现死锁

条件：1、资源不够；2、使用资源的协程不会主动释放；3、使用资源的协程不会被动释放；4、循环等待

```go
func main() {
  c := make(int)
  <-c
  fmt.Println("end")
}
```

1、无缓存通道，必须是一个读，一个写，这里会默认两者存在

2、读的协程不会主动放弃

3、主协程不会被动放弃

4、主协程会一直进行等待
