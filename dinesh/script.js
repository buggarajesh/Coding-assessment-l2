const api = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
async function dev() {
    let resultcolor = []
    let resultsize = []
    const f = await fetch(api)
    const res = await f.json()
    console.log(res)
    //title
    const header = document.querySelector(".header")
    const vendor_name = res.product.vendor
    const title_name = res.product.title
    const vendor = document.createElement("p")
    const title = document.createElement("p")
    vendor.innerText = vendor_name
    title.innerText = title_name
    header.appendChild(vendor)
    header.appendChild(title)
    //price
    const original = res.product.compare_at_price
    const price = res.product.price
    const total_price = document.createElement("p")
    const discount = document.createElement("p")
    const pr = document.createElement('p')
    discount.innerText = "35% off"
    total_price.innerText = price + ".00"
    const lost = document.createElement("p")
    lost.innerText = original + ".00"
    lost.className = "hello"
    pr.appendChild(total_price)
    pr.appendChild(discount)
    const pri = document.querySelector(".price")
    pri.appendChild(pr)
    pri.appendChild(lost)
    //color
    let color = document.querySelector(".col")
    const colors = res.product.options[0].values
    let co = 0
    for (let i = 0; i < 4; i++) {
        const div = document.createElement("div")
        let az = ["#ECDECC", "#BBD278", "#BBC1F8", "#FFD3F8"]
        const iz = document.createElement("i")
        div.className = "picker"
        div.style.width = "64px"
        div.style.height = "64px"
        div.addEventListener("click", () => selectColor(div));
        div.style.background = `${az[co]}`
        color.appendChild(div)
        co++
        console.log(co)
    }
    const sizes = res.product.options[1].values
    const size = document.querySelector(".siz")
    for (let i = 0; i < sizes.length; i++) {
        const sub = document.createElement("div")
        const rad = document.createElement("input")
        sub.className = "sub"
        rad.type = "radio"
        const p = document.createElement("p")
        p.className = "pz"
        sub.addEventListener("click", () => sizer(sub))
        p.innerText = sizes[i]
        sub.append(rad)
        sub.appendChild(p)
        size.appendChild(sub)
    }
    //counter
    let count = 1
    let counter = document.getElementById("increment")
    const inc = document.getElementById("inc")
    const dec = document.getElementById("dec")
    inc.addEventListener("click", () => {
        count++
        counter.innerText = count
        console.log(count)
    })
    dec.addEventListener("click", () => {
        if (count > 1) {
            count--
            counter.innerText = count
        }
    })
    let color_picker = document.querySelectorAll(".picker")
    function selectColor(element) {
        color_picker.forEach((ele) => {
            ele.classList.remove("active")
            for (let i = 0; i < resultcolor.length; i++) {
                resultcolor.pop()
            }
        })
        element.classList.add("active")
        let target = document.getElementById("volor")
        const computedStyle = window.getComputedStyle(element);
        const outlineColor = computedStyle.getPropertyValue('background').split(" ")
        let z = outlineColor[0] + outlineColor[1] + outlineColor[2]
        if (z == "rgb(187,193,248)") {
            z = "blue"
        } if (z == "rgb(187,210,120)") {
            z = "green"
        } if (z == "rgb(236,222,204)") {
            z = "yellow"
        } if (z == "rgb(255,211,248)") {
            z = "pink"
        }
        resultcolor.push(z)
        console.log(resultcolor)
        const right = document.querySelector(".fa-solid")
        element.style.outline = `1px solid ${outlineColor[0] + outlineColor[1] + outlineColor[2]}`
    }
    const si = document.querySelectorAll(".sub")
    function sizer(element) {
        si.forEach((ele) => {
            ele.classList.remove("active")
            const radiobtn = ele.querySelectorAll("input[type=radio]")
            radiobtn.forEach((ele) => {
                ele.checked = false
            })
            for (let i = 0; i < resultsize.length; i++) {
                resultsize.pop()
            }
        })
        element.classList.add("active")
        const btn = element.querySelector("input[type=radio]")
        let pz = element.querySelector(".pz")
        resultsize.push(pz.innerText)
        console.log(resultsize)
        btn.checked = true
    }
    const re = document.getElementById("zoo")
    re.addEventListener("click", () => {
        let roar = []
        roar.push(title_name)
        roar.push(" with color ")
        roar.push(resultcolor[0])
        roar.push(" and size ")
        roar.push(resultsize[0])
        roar.push(" added to cart")
        let h = roar.join("")
        console.log(h)
        let rq = document.getElementById("result")
        rq.style.background = "#E7F8B7"
        rq.innerText = h
    })
}
dev()