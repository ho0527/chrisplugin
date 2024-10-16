/*
	標題: 插件整合
	參考: 無
	作者: 小賀chris
	製作及log:
	2023/06/28  20:10:16 Bata 1.0.0 // 新增macosselection 以及 sort 以及 dget 以及 clog函式
	2023/06/30  14:35:45 Bata 1.0.1 // 新增isset函式
	2023/07/01  12:52:01 Bata 1.0.2 // 修改變數及小問題
	2023/07/01  12:56:24 Bata 1.0.3 // 新增domgetid 及 docgetall 及 weblsset 及 weblsget函式
	2023/07/02  23:39:12 Bata 1.0.4 // 新增doccreate函式
	2023/07/09  21:54:50 Bata 1.0.5 // 新增ajax函式
	2023/07/12  13:51:52 Bata 1.0.6 // 新增lightbox函式
	2023/07/13  19:08:05 Bata 1.0.7 // 新增docappendchild函式
	2023/07/15  20:22:11 Bata 1.0.8 // 新增regexp 及 regexpmatch 及 regexpreplace 函式
	2023/07/16  15:24:44 Bata 1.0.9 // 修改conlog函式
	2023/07/20  13:28:05 Bata 1.0.10 // 新增ajaxdata函式
	2023/07/21  18:38:23 Bata 1.0.11 // 修改ajaxdata函式
	2023/07/23  18:18:28 Bata 1.0.12 // 新增pagechanger函式
	2023/07/25  22:12:42 Bata 1.0.13 // 修改lightbox函式
	2023/07/25  10:50:11 Bata 1.0.14 // 修改lightbox函式
	2023/08/01  23:22:33 Bata 1.0.15 // 修改formdata函式
	2023/08/09  18:27:14 Bata 1.0.16 // 修改lightbox函式新增clickcolse變數
	2023/09/14  16:57:12 Bata 1.0.17 // 更新startmacossection函式
	2023/11/20  18:01:04 Bata 1.0.18 // 新增hintbox函式
	2023/12/04  14:23:29 Bata 1.0.19 // 新增tag函式
	2024/01/08  21:17:23 Bata 1.0.25 // 新增on*函式
	2024/01/16  18:25:29 Bata 2.0.0 // 函式大更新
	2024/02/06  22:38:46 Bata 2.1.0 // 函式衝突更新

		|-------    -----    -                     -     -----  -----  -----   -------|
	   |-------    -        -            - - -          -                     -------|
	  |-------    -        -------    -          -     -----    --       --  -------|
	 |-------    -        -     -    -          -         -      --     --  -------|
	|-------    -----    -     -    -          -     -----         -----  -------|
*/

const MAXINT=9999999999
const MININT=-9999999999

function startmacossection(){
	let macostimer
	setInterval(function(){
		docget("qtor","body").onscroll=function(){
			clearTimeout(macostimer)
			docget("qtor","body").setAttribute("scroll","true")
			macostimer=setTimeout(function(){
				docget("qtor","body").removeAttribute("scroll")
			},500)
		}
		domgetall("textarea").forEach(function(event){
			event.onscroll=function(){
				clearTimeout(macostimer)
				event.parentNode.setAttribute("scroll","true")
				macostimer=setTimeout(function(){
					event.parentNode.removeAttribute("scroll")
				},500)
			}
		})
		document.querySelectorAll(".macossectiondiv").forEach(function(event){
			event.addEventListener("scroll",function(){
				clearTimeout(macostimer)
				event.setAttribute("scroll","true")
				macostimer=setTimeout(function(){
					event.removeAttribute("scroll")
				},500)
			})
		})
		document.querySelectorAll(".macossectiondivx").forEach(function(event){
			event.addEventListener("scroll",function(){
				clearTimeout(macostimer)
				event.setAttribute("scroll","true")
				macostimer=setTimeout(function(){
					event.removeAttribute("scroll")
				},500)
			})
		})
		document.querySelectorAll(".macossectiondivy").forEach(function(event){
			event.addEventListener("scroll",function(){
				clearTimeout(macostimer)
				event.setAttribute("scroll","true")
				macostimer=setTimeout(function(){
					event.removeAttribute("scroll")
				},500)
			})
		})
	},200)
}

function divsort(card,sortdiv,callback=function(){}){
	document.querySelectorAll("."+card).forEach(function(event){
		event.draggable="true"
		event.style.cursor="grab"
	})

	document.querySelectorAll(sortdiv).forEach(function(event){
		event.ondragstart=function(addeventlistenerevent){
            if(!event.querySelector("input:focus,textarea:focus,select:focus")){
				addeventlistenerevent.target.classList.add("divsortdragging")
				event.style.cursor="grabbing"
            }else{
                addeventlistenerevent.preventDefault()
            }
		}

		event.ondragover=function(addeventlistenerevent){
			if(!event.querySelector("input:focus,textarea:focus,select:focus")){
				addeventlistenerevent.preventDefault()
				let sortablecontainer=addeventlistenerevent.target.closest(sortdiv)
				if(sortablecontainer){
					let draggableelement=Array.from(sortablecontainer.children).filter(function(child){
						return child.classList.contains(card)&&!child.classList.contains("divsortdragging")
					})

					let afterelement=draggableelement.reduce(function(closest,child){
						let box=child.getBoundingClientRect()
						let offset=addeventlistenerevent.clientY-box.top-box.height/2
						if(offset<0&&offset>closest.offset){
							return{ offset:offset,element:child }
						}else{
							return closest
						}
					},{ offset:Number.NEGATIVE_INFINITY }).element

					let draggable=document.querySelector(".divsortdragging")
					if(afterelement==null){
						sortablecontainer.appendChild(draggable)
					}else{
						sortablecontainer.insertBefore(draggable,afterelement)
					}
				}
			}
		}

		event.ondragend=function(addeventlistenerevent){
			addeventlistenerevent.target.classList.remove("divsortdragging")
			event.style.cursor="grab"
			callback()
		}
	})
}

function docget(key,selector){
	if(key=="id"){
		return document.getElementById(selector)
	}
	if(key=="animation"){
		return document.getAnimations(selector)
	}
	if(key=="class"){
		return document.getElementsByClassName(selector)
	}
	if(key=="name"){
		return document.getElementsByName(selector)
	}
	if(key=="tag"){
		return document.getElementsByTagName(selector)
	}
	if(key=="tagns"){
		return document.getElementsByTagNameNS(selector)
	}
	if(key=="qtor"){
		return document.querySelector(selector)
	}
	if(key=="all"){
		return document.querySelectorAll(selector)
	}
	conlog("[ERROR]dget key not found"+key)
}

function docgetid(selector){
	return document.getElementById(selector)
}

function docgetall(selector){
	return document.querySelectorAll(selector)
}

function domget(key,selector){
	if(key=="id"){
		return document.getElementById(selector)
	}
	if(key=="animation"){
		return document.getAnimations(selector)
	}
	if(key=="class"){
		return document.getElementsByClassName(selector)
	}
	if(key=="name"){
		return document.getElementsByName(selector)
	}
	if(key=="tag"){
		return document.getElementsByTagName(selector)
	}
	if(key=="tagns"){
		return document.getElementsByTagNameNS(selector)
	}
	if(key=="qtor"){
		return document.querySelector(selector)
	}
	if(key=="all"){
		return document.querySelectorAll(selector)
	}
	conlog("[ERROR]dget key not found"+key)
}

function domgetid(selector){
	return document.getElementById(selector)
}

function domgetall(selector,callback=function(){}){
	document.querySelectorAll(selector).forEach(function(event){ callback(event) })
	return document.querySelectorAll(selector)
}

function conlog(data,color="white",size="12",weight="normal"){
	console.log(`%c${data}`,`color:${color};font-size:${size}px;font-weight:${weight}`)
}

function isset(data){
	if(data!=null&&data!=undefined){ return true }
	else{ return false }
}

function blank(data){
	if(data!=null&&data!=undefined&&data!=""){ return true }
	else{ return false }
}

function weblsset(data,value){
	if(value==null){
		return localStorage.removeItem(data)
	}else{
		if(typeof value=="object"||typeof value=="array"){
			return localStorage.setItem(data,JSON.stringify(value))
		}else{
			return localStorage.setItem(data,value)
		}
	}
}

function weblsget(data,tojson=true){
	if(tojson==true){
		try{
			let data=JSON.parse(localStorage.getItem(data))
			return data
		}catch(error){
			return localStorage.getItem(data)
		}
	}else{
		return localStorage.getItem(data)
	}
}

function doccreate(element){
	return document.createElement(element)
}

function oldajax(method,url,send=null,header=[["Content-type","multipart/form-data"]]){
	let xmlrequest=new XMLHttpRequest()
	xmlrequest.open(method,url)
	for(let i=0;i<header.length;i=i+1){
		xmlrequest.setRequestHeader(header[i][0],header[i][1])
	}
	xmlrequest.send(send)
	return xmlrequest
}

function ajax(method,url,onloadcallback,send=null,header=[],progresscallback=function(processevent,percentage){},statechange=[function(){},function(){},function(){},function(){}],callback=[]){
	let check=true
	if(method==null){
		conlog("function ajax method requset","red","12")
		check=false
	}
	if(url==null){
		conlog("function ajax method requset","red","12")
		check=false
	}
	if(onloadcallback==null){
		conlog("function ajax method requset","red","12")
		check=false
	}
	if(check){
		let xmlhttprequest=new XMLHttpRequest()

		xmlhttprequest.open(method,url)

		for(let i=0;i<header.length;i=i+1){
			xmlhttprequest.setRequestHeader(header[i][0],header[i][1])
		}

		xmlhttprequest.onreadystatechange=function(){
			if(this.readyState==0){
				statechange[0](this)
			}

			if(this.readyState==1){
				statechange[1](this)
			}

			if(this.readyState==2){
				statechange[2](this)
			}

			if(this.readyState==3){
				statechange[3](this)
			}

			if(this.readyState==4){
				let data=this.responseText

				try{
					data=JSON.parse(this.responseText)
					onloadcallback(this,data)
				}catch(error){
					onloadcallback(this,data)
				}
			}
		}

		xmlhttprequest.onprogress=function(event){
			progresscallback(event,(event.loaded/event.total)*100)
		}

		for(let i=0;i<callback.length;i=i+1){
			xmlhttprequest[callback[i][0]]=function(){ callback[i][1](this) }
		}
		xmlhttprequest.send(send)
		return xmlhttprequest
	}
}

function newajax(method,url,onloadcallback,send=null,header=[["Content-type","multipart/form-data"]],progresscallback=function(event){},statechange=[function(){},function(){},function(){},function(){}],callback=[]){
	let check=true
	if(method==null){
		conlog("function ajax method requset","red","12")
		check=false
	}
	if(url==null){
		conlog("function ajax method requset","red","12")
		check=false
	}
	if(onloadcallback==null){
		conlog("function ajax method requset","red","12")
		check=false
	}
	if(check){
		let xmlhttprequest=new XMLHttpRequest()

		xmlhttprequest.open(method,url)

		for(let i=0;i<header.length;i=i+1){
			xmlhttprequest.setRequestHeader(header[i][0],header[i][1])
		}

		xmlhttprequest.onreadystatechange=function(){
			if(this.readyState==0){
				statechange[0](this)
			}

			if(this.readyState==1){
				statechange[1](this)
			}

			if(this.readyState==2){
				statechange[2](this)
			}

			if(this.readyState==3){
				statechange[3](this)
			}

			if(this.readyState==4){
				let data=this.responseText

				try{
					data=JSON.parse(this.responseText)
				}finally{
					onloadcallback(this,data)
				}
			}
		}

		xmlhttprequest.upload.onprogress=function(event){
			if(event.lengthComputable){
				progresscallback(event,(event.loaded/event.total)*100)
			}else{
				console.warn("[EXP_UPLOADDATA WARNING]function ajax warn: onprogress can't be progress")
			}
		}

		for(let i=0;i<callback.length;i=i+1){
			xmlhttprequest[callback[i][0]]=function(){ callback[i][1](this) }
		}
		xmlhttprequest.send(send)
		return xmlhttprequest
	}
}

function closelightbox(){
	docgetall(".lightboxmask")[0].style.transform="translateY(-100%)"

	setTimeout(function(){
		docgetall(".lightboxmask")[0].innerHTML=``
	},300)
}

function lightboxclose(){
	docgetall(".lightboxmask")[0].style.transform="translateY(-100%)"

	setTimeout(function(){
		docgetall(".lightboxmask")[0].innerHTML=``
	},300)
}

function lightbox(clickelement,element,lightboxhtml,closelement=null,islightboxclosewithkeyesc=true,clickcolse="mask"){
	let click=false

	domgetid(element).classList.add("lightboxmask")

	if(!isset(clickelement)){
		domgetid(element).innerHTML=``
		setTimeout(function(){
			domgetid(element).style.transform="translateY(0)"
		},300)
		docgetid(element).innerHTML=`
			<div class="lightboxmain macossectiondiv">
				${lightboxhtml()}
			</div>
		`
		if(closelement){
			docgetid(closelement).onclick=function(){
				docgetid(element).style.transform="translateY(-100%)"

				setTimeout(function(){
					docgetid(element).innerHTML=``
				},300)
			}
		}
	}else{
		docgetid(element).innerHTML=``
		docgetall(clickelement).forEach(function(event){
			event.onclick=function(){
				docgetid(element).style.display="block"
				setTimeout(function(){
					docgetid(element).style.transform="translateY(0)"
				},300)
				docgetid(element).innerHTML=`
					<div class="lightboxmain macossectiondiv">
						`+lightboxhtml(event)+`
					</div>
				`
				if(closelement!=null){
					docgetid(closelement).onclick=function(){
						docgetid(element).style.transform="translateY(-100%)"
						setTimeout(function(){
							docgetid(element).innerHTML=``
						},300)
					}
				}
			}
		})
	}

	if(islightboxclosewithkeyesc){
		document.onkeydown=function(event){
			if(event.key=="Escape"){
				event.preventDefault()
				docgetid(element).style.transform="translateY(-100%)"
				setTimeout(function(){
					docgetid(element).innerHTML=``
				},300)
			}
		}
	}

	if(clickcolse=="body"){
		document.onclick=function(){
			docgetid(element).style.transform="translateY(-100%)"
			setTimeout(function(){
				docgetid(element).innerHTML=``
			},300)
		}
	}else if(clickcolse=="mask"){
		docgetid(element).onmousedown=function(event){
			if(event.target==docgetid(element)){
				click=true
			}
		}
		docgetid(element).onmouseup=function(event){
			if(click){
				if(event.target==docgetid(element)){
					docgetid(element).style.transform="translateY(-100%)"
					setTimeout(function(){
						docgetid(element).innerHTML=``
					},300)
				}else{
					click=false
				}
			}else{
				click=false
			}
		}
	}else if(clickcolse=="none"){
	}else{
		console.log("lightbox clickcolse變數 錯誤")
		return "lightbox clickcolse變數 錯誤"
	}
}

function docappendchild(element,chlidelement){
	return docgetid(element).appendChild(chlidelement)
}

function regexp(regexptext,regexpstring){
	return new RegExp.test(regexptext,regexpstring)
}

function regexpmatch(regexptext,data){
	return regexptext.exec(data)
}

function regexpreplace(data,regexpstring,replacetext){
	return data.replace(regexpstring,replacetext)
}

function formdata(data=[]){
	let formdata=new FormData()
	for(let i=0;i<data.length;i=i+1){
		formdata.append(data[i][0],data[i][1])
	}
	return formdata
}

function pagechanger(data,ipp,key,callback){
	if(!isset(weblsget("pagecount"))){ weblsset("pagecount",1) }
	let row=data
	let pagecount=parseInt(weblsget("pagecount"))
	let itemperpage=ipp
	let maxpagecount=Math.ceil(row.length/itemperpage)
	if(key=="first"){
		pagecount=1
	}else if(key=="prev"){
		pagecount=Math.max(1,pagecount-1)
	}else if(key=="next"){
		pagecount=Math.min(pagecount+1,maxpagecount)
	}else if(key=="end"){
		pagecount=maxpagecount
	}

	weblsset("pagecount",pagecount)
	let page=parseInt(weblsget("pagecount"))
	let start=(page-1)*itemperpage;
	let rowcount=Math.min(row.length-start,itemperpage);
	let end=start+rowcount;

	for(let i=start;i<end;i=i+1){
		callback(row[i])
	}
}

function hintbox(endcallback=function(){},hintname=".hintdiv"){
	let hintlist=[]
	let hintcount=0

	docgetall(hintname).forEach(function(event){
		event.style.position="relative"
		hintlist[parseInt(event.dataset.id)]=event
	})

	function clear(){
		for(let i=0;i<hintlist.length;i=i+1){
			if(docgetid("hintbox")){
				docgetid("hintbox").remove()
			}
		}
	}

	function main(){
		clear()
		hintlist[hintcount].innerHTML=`
			${hintlist[hintcount].innerHTML}
			<div class="hintbox" id="hintbox">
				<div class="hiintboxclose" id="chrispluginhintboxclear">X</div>
				<div class="hiintboxbody">${hintlist[hintcount].dataset.body}</div>
				<div class="hiintboxbuttondiv">
					<input type="button" class="hintboxbutton hintboxbuttonleft" id="chrispluginhintboxprev" value="prev">
					<input type="button" class="hintboxbutton hintboxbuttonright" id="chrispluginhintboxnext" value="next">
				</div>
			</div>
		`

		if(domgetid("hintbox").getBoundingClientRect().top<=225){
			domgetid("hintbox").style.top="25px"
		}else{
			domgetid("hintbox").style.top="-100px"
		}

		docgetid("chrispluginhintboxclear").onclick=function(){
			clear()
			endcallback()
		}

		docgetid("chrispluginhintboxprev").onclick=function(){
			if(hintcount>0){
				hintcount=hintcount-1
				main()
			}
		}

		docgetid("chrispluginhintboxnext").onclick=function(){
			if(hintcount<hintlist.length-1){
				hintcount=hintcount+1
				main()
			}else{
				clear()
				endcallback()
			}
		}
	}
	main()
}

function login(
	submitfunction=function(){},
	navbar=`
		<div class="navigationbar">
			<div class="navigationbarleft">
				<img src="/website/material/icon/mainicon.png" class="logo" draggable="false">
				<div class="maintitle">title</div>
			</div>
			<div class="navigationbarright">
			</div>
		</div>
	`,
	center=`
		<div class="main" id="loginmain">
			<div class="iconinputdiv">
				<div class="iconinputtext">帳號:</div>
				<input type="text" class="iconiinputinput input" id="username">
				<div class="iconinputicondiv"><img src="/website/material/icon/user.svg" class="iconinputicon" draggable="false"></div>
			</div>
			<div class="iconinputdiv">
				<div class="iconinputtext">密碼:</div>
				<input type="password" class="iconiinputinput input" id="password">
				<div class="iconinputicondiv"><img src="/website/material/icon/eyeclose.svg" class="iconinputicon cursor_pointer" id="passwordicon" draggable="false"></div>
			</div>
			<input type="button" class="button" id="signup" value="註冊">
			<input type="button" class="button" id="submit" value="登入"><br>
		</div>
	`,
	footer=``
){
	docgetall("body")[0].innerHTML=`
		${navbar}
		${center}
		${footer}
	`

	docgetall(".iconinputdiv").forEach(function(event){
		event.onclick=function(){
			event.children[1].focus()
		}
	})

	if(docgetid("passwordicon")){
		if(weblsget("passwordshow")=="true"){
			docgetid("passwordicon").src="/website/material/icon/eyeopen.svg"
			docgetid("password").type="text"
		}else{
			docgetid("passwordicon").src="/website/material/icon/eyeclose.svg"
			docgetid("password").type="password"
		}

		docgetid("passwordicon").onclick=function(){
			if(weblsget("passwordshow")=="true"){
				docgetid("passwordicon").src="/website/material/icon/eyeclose.svg"
				docgetid("password").type="password"
				weblsset("passwordshow","false")
			}else{
				docgetid("passwordicon").src="/website/material/icon/eyeopen.svg"
				docgetid("password").type="text"
				weblsset("passwordshow","true")
			}
		}
	}

	docgetid("submit").onclick=submitfunction
}

function signin(
	submitfunction=function(){},
	navbar=`
		<div class="navigationbar">
			<div class="navigationbarleft">
				<img src="/website/material/icon/mainicon.png" class="logo" draggable="false">
				<div class="maintitle">title</div>
			</div>
			<div class="navigationbarright">
			</div>
		</div>
	`,
	center=`
		<div class="main" id="loginmain">
			<div class="iconinputdiv">
				<div class="iconinputtext">帳號:</div>
				<input type="text" class="iconiinputinput input" id="username">
				<div class="iconinputicondiv"><img src="/website/material/icon/user.svg" class="iconinputicon" draggable="false"></div>
			</div>
			<div class="iconinputdiv">
				<div class="iconinputtext">密碼:</div>
				<input type="password" class="iconiinputinput input" id="password">
				<div class="iconinputicondiv"><img src="/website/material/icon/eyeclose.svg" class="iconinputicon cursor_pointer" id="passwordicon" draggable="false"></div>
			</div>
			<input type="button" class="button" id="signup" value="註冊">
			<input type="button" class="button" id="submit" value="登入"><br>
		</div>
	`,
	footer=``
){
	docgetall("body")[0].innerHTML=`
		${navbar}
		${center}
		${footer}
	`

	docgetall(".iconinputdiv").forEach(function(event){
		event.onclick=function(){
			event.children[1].focus()
		}
	})

	if(docgetid("passwordicon")){
		if(weblsget("passwordshow")=="true"){
			docgetid("passwordicon").src="/website/material/icon/eyeopen.svg"
			docgetid("password").type="text"
		}else{
			docgetid("passwordicon").src="/website/material/icon/eyeclose.svg"
			docgetid("password").type="password"
		}

		docgetid("passwordicon").onclick=function(){
			if(weblsget("passwordshow")=="true"){
				docgetid("passwordicon").src="/website/material/icon/eyeclose.svg"
				docgetid("password").type="password"
				weblsset("passwordshow","false")
			}else{
				docgetid("passwordicon").src="/website/material/icon/eyeopen.svg"
				docgetid("password").type="text"
				weblsset("passwordshow","true")
			}
		}
	}

	docgetid("submit").onclick=submitfunction
}

function smoothscroll(id){
	if(document.getElementById(id)){
		document.getElementById(id).scrollIntoView({ behavior: "smooth" })
	}else{
		conlog("[ERROR]function smoothscroll id not found","red","12")
	}
}

function tag(tagdiv,taglist,newtag=function(){}){
	let tagset=new Set()

	function updatetaglist(){
		docgetid("taglist").innerHTML=``
		for(let i=0;i<taglist.length;i=i+1){
			docgetid("taglist").innerHTML=`
				${docgetid("taglist").innerHTML}
				<div class="tag" data-name="${taglist[i]["name"]}" style="background: ${taglist[i]["color"]}">
					${taglist[i]["name"]}
				</div>
			`
		}

		// 觸發點擊事件
		docgetall("#taglist>.tag").forEach(function(event){
			event.onclick=function(){
				selecttag(event.dataset.name)
			}
		})
	}

	function selecttag(tagname){
		if(!tagset.has(tagname)){
			let color

			tagset.add(tagname)

			for(let i=0;i<taglist.length;i=i+1){
				if(taglist[i]["name"]==tagname){
					color=taglist[i]["color"]
					break
				}
			}

			docgetid("selecttag").innerHTML=`
				${docgetid("selecttag").innerHTML}
				<div class="tag" data-name="${tagname}" style="background: ${color}">
					${tagname}
					<div class="tagdelete">X</div>
				</div>
			`

			// 觸發點擊事件
			docgetall("#selecttag>.tag").forEach(function(event){
				event.querySelector(".tagdelete").onclick=function(){
					tagset.delete(event.dataset.name)
					event.remove()
					updatetaglist()
					filtertags()
					docgetid("taglist").style.display="block"
				}
			})

			docgetid("taginput").value=""
			docgetid("taglist").style.display="block"
		}
	}

	function filtertags(){
		let value=docgetid("taginput").value.toLowerCase()

		docgetid("taglist").style.display="block"

		for(let i=0;i<taglist.length;i=i+1){
			let tagElement=docgetid("taglist").querySelector(`.tag:nth-child(${taglist[i]["id"]})`)
			if(taglist[i]["name"].toLowerCase().includes(value)){
				tagElement.style.display="block"
			}else{
				tagElement.style.display="none"
			}
		}
	}

	docgetid(tagdiv).classList.add("tagdiv")

	docgetid(tagdiv).innerHTML=`
		<div class="tagcontrol">
			<div class="tagwrapper">
				<div class="selecttag" id="selecttag"></div>
				<input type="text" class="taginput" id="taginput" placeholder="Add a tag...">
			</div>
		</div>
		<div class="taglist" id="taglist"></div>
	`

	updatetaglist()

	docgetid("taginput").oninput=filtertags

	docgetid("taginput").onkeydown=function(event){
		if(event.key=="Enter"){
			let value=event.target.value.trim()
			if(value&&!tagset.has(value)){
				// 查看是否有資料
				if(!taglist.find(function(tag){ tag.name.toLowerCase()==value.toLowerCase() })){
					// 新增tag
					taglist.push({ id: taglist.length+1,name: value,color: "" })
					updatetaglist()
					selecttag(value)
					newtag(value)
				}else{
					selecttag(value)
				}
			}
			event.target.value=""
		}else if(event.key=="Backspace"&&event.target.value==""){
			let selectedtagsDiv=docgetid("selected-taglist")
			let lasttag=selectedtagsDiv.lastChild
			if(lasttag){
				tagset.delete(lasttag.textContent)
				selectedtagsDiv.removeChild(lasttag)
			}
		}
	}

	docgetid("taginput").onfocus=function(){
		docgetid("taglist").style.display="block"
		filtertags() // 確保在顯示時更新標籤列表
	}

	document.onclick=function(event){
		if(event.target.id!="taginput"&&event.target.id!="taglist"){
			docgetid("taglist").style.display="none"
		}
	}

	divsort("tag","#selecttag")
}

// --- 自用函式 ---
function passwordshowhide(url="/",id="passwordicon"){
	if(docgetid(id)){
		if(weblsget("passwordshow")=="true"){
			docgetid(id).src=url+"material/icon/eyeopen.svg"
			docgetid("password").type="text"
		}else{
			docgetid(id).src=url+"material/icon/eyeclose.svg"
			docgetid("password").type="password"
		}

		docgetid(id).onclick=function(){
			if(weblsget("passwordshow")=="true"){
				docgetid(id).src=url+"material/icon/eyeclose.svg"
				docgetid("password").type="password"
				weblsset("passwordshow","false")
			}else{
				domgetid(id).src=url+"material/icon/eyeopen.svg"
				domgetid("password").type="text"
				weblsset("passwordshow","true")
			}
		}
	}
}
// --- 自用函式 ---

// on* event START
function on(key,element,callback=function(){}){
	if(typeof element=="object"){
		if(element.length){
			try{
				element.forEach(function(event){
					event.addEventListener(key,function(onevent){ callback(event,onevent) })
				})
			}catch(error){
				console.error("[KEYTYPEIN ERROR]function on* key not found keyname-->"+key)
			}
		}else{
			try{
				element.addEventListener(key,function(onevent){ callback(element,onevent) })
			}catch(error){
				console.error("[KEYTYPEIN ERROR]function on* key not found keyname-->"+key)
			}
		}
	}else{
		try{
			domgetall(element,function(event){
				event.addEventListener(key,function(onevent){ callback(event,onevent) })
			})
		}catch(error){
			console.error("[KEYTYPEIN ERROR]function on* key not found keyname-->"+key)
		}
	}
}

function onenterclick(element,callback=function(){}){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				event.onkeydown=function(event2){
					if(event2.key=="Enter")
						callback()
				}
			})
		}else{
			element.onkeydown=function(event2){
				if(event2.key=="Enter")
					callback()
			}
		}
	}else{
		domgetall(element,function(event){
			event.onkeydown=function(event2){
				if(event2.key=="Enter")
					callback()
			}
		})
	}

	return{
		"success": true,
		"data": ""
	}
}

function getelement(element,callback=function(){}){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				callback(event)
			})
		}else{
			callback(element)
		}
	}else{
		domgetall(element,function(event){
			callback(event)
		})
	}
}

function onenterkeydown(element,callback=function(){}){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				event.onkeydown=function(event2){
					if(event2.key=="Enter")
						callback()
				}
			})
		}else{
			element.onkeydown=function(event2){
				if(event2.key=="Enter")
					callback()
			}
		}
	}else{
		domgetall(element,function(event){
			event.onkeydown=function(event2){
				if(event2.key=="Enter")
					callback()
			}
		})
	}

	return{
		"success": true,
		"data": ""
	}
}

function onabort(element,callback=function(){}){ on("abort",element,callback) }
function onactivate(element,callback=function(){}){ on("activate",element,callback) }
function onaddtrack(element,callback=function(){}){ on("addtrack",element,callback) }
function onafterprint(element,callback=function(){}){ on("afterprint",element,callback) }
function onanimationcancel(element,callback=function(){}){ on("animationcancel",element,callback) }
function onanimationend(element,callback=function(){}){ on("animationend",element,callback) }
function onanimationiteration(element,callback=function(){}){ on("animationiteration",element,callback) }
function onanimationstart(element,callback=function(){}){ on("animationstart",element,callback) }
function onappinstalled(element,callback=function(){}){ on("appinstalled",element,callback) }
function onauxclick(element,callback=function(){}){ on("auxclick",element,callback) }
function onbeforeinput(element,callback=function(){}){ on("beforeinput",element,callback) }
function onbeforeprint(element,callback=function(){}){ on("beforeprint",element,callback) }
function onbeforeunload(element,callback=function(){}){ on("beforeunload",element,callback) }
function onblur(element,callback=function(){}){ on("blur",element,callback) }
function oncancel(element,callback=function(){}){ on("cancel",element,callback) }
function oncanplay(element,callback=function(){}){ on("canplay",element,callback) }
function oncanplaythrough(element,callback=function(){}){ on("canplaythrough",element,callback) }
function onchange(element,callback=function(){}){ on("change",element,callback) }
function onclick(element,callback=function(){}){ on("click",element,callback) }
function onclose(element,callback=function(){}){ on("close",element,callback) }
function oncompositionend(element,callback=function(){}){ on("compositionend",element,callback) }
function oncompositionstart(element,callback=function(){}){ on("compositionstart",element,callback) }
function oncompositionupdate(element,callback=function(){}){ on("compositionupdate",element,callback) }
function oncontextmenu(element,callback=function(){}){ on("contextmenu",element,callback) }
function oncuechange(element,callback=function(){}){ on("cuechange",element,callback) }
function oncut(element,callback=function(){}){ on("cut",element,callback) }
function ondblclick(element,callback=function(){}){ on("dblclick",element,callback) }
function ondevicechange(element,callback=function(){}){ on("devicechange",element,callback) }
function ondevicemotion(element,callback=function(){}){ on("devicemotion",element,callback) }
function ondeviceorientation(element,callback=function(){}){ on("deviceorientation",element,callback) }
function ondrag(element,callback=function(){}){ on("drag",element,callback) }
function ondragend(element,callback=function(){}){ on("dragend",element,callback) }
function ondragenter(element,callback=function(){}){ on("dragenter",element,callback) }
function ondragleave(element,callback=function(){}){ on("dragleave",element,callback) }
function ondragover(element,callback=function(){}){ on("dragover",element,callback) }
function ondragstart(element,callback=function(){}){ on("dragstart",element,callback) }
function ondrop(element,callback=function(){}){ on("drop",element,callback) }
function ondurationchange(element,callback=function(){}){ on("durationchange",element,callback) }
function onended(element,callback=function(){}){ on("ended",element,callback) }
function onerror(element,callback=function(){}){ on("error",element,callback) }
function onfocus(element,callback=function(){}){ on("focus",element,callback) }
function onfullscreenchange(element,callback=function(){}){ on("fullscreenchange",element,callback) }
function onfullscreenerror(element,callback=function(){}){ on("fullscreenerror",element,callback) }
function ongamepadconnected(element,callback=function(){}){ on("gamepadconnected",element,callback) }
function ongamepaddisconnected(element,callback=function(){}){ on("gamepaddisconnected",element,callback) }
function onhashchange(element,callback=function(){}){ on("hashchange",element,callback) }
function onicecandidate(element,callback=function(){}){ on("icecandidate",element,callback) }
function oniceconnectionstatechange(element,callback=function(){}){ on("iceconnectionstatechange",element,callback) }
function oninput(element,callback=function(){}){ on("input",element,callback) }
function onkeydown(element,callback=function(){}){ on("keydown",element,callback) }
function onkeypress(element,callback=function(){}){ on("keypress",element,callback) }
function onkeyup(element,callback=function(){}){ on("keyup",element,callback) }
function onlanguagechange(element,callback=function(){}){ on("languagechange",element,callback) }
function onload(element,callback=function(){}){ on("load",element,callback) }
function onloadeddata(element,callback=function(){}){ on("loadeddata",element,callback) }
function onloadedmetadata(element,callback=function(){}){ on("loadedmetadata",element,callback) }
function onloadstart(element,callback=function(){}){ on("loadstart",element,callback) }
function onmessage(element,callback=function(){}){ on("message",element,callback) }
function onmousedown(element,callback=function(){}){ on("mousedown",element,callback) }
function onmouseenter(element,callback=function(){}){ on("mouseenter",element,callback) }
function onmouseleave(element,callback=function(){}){ on("mouseleave",element,callback) }
function onmousemove(element,callback=function(){}){ on("mousemove",element,callback) }
function onmouseout(element,callback=function(){}){ on("mouseout",element,callback) }
function onmouseover(element,callback=function(){}){ on("mouseover",element,callback) }
function onmouseup(element,callback=function(){}){ on("mouseup",element,callback) }
function onpause(element,callback=function(){}){ on("pause",element,callback) }
function onplay(element,callback=function(){}){ on("play",element,callback) }
function onplaying(element,callback=function(){}){ on("playing",element,callback) }
function onpointercancel(element,callback=function(){}){ on("pointercancel",element,callback) }
function onpointerdown(element,callback=function(){}){ on("pointerdown",element,callback) }
function onpointerenter(element,callback=function(){}){ on("pointerenter",element,callback) }
function onpointerleave(element,callback=function(){}){ on("pointerleave",element,callback) }
function onpointermove(element,callback=function(){}){ on("pointermove",element,callback) }
function onpointerout(element,callback=function(){}){ on("pointerout",element,callback) }
function onpointerover(element,callback=function(){}){ on("pointerover",element,callback) }
function onpointerup(element,callback=function(){}){ on("pointerup",element,callback) }
function onpopstate(element,callback=function(){}){ on("popstate",element,callback) }
function onprogress(element,callback=function(){}){ on("progress",element,callback) }
function onratechange(element,callback=function(){}){ on("ratechange",element,callback) }
function onreadystatechange(element,callback=function(){}){ on("readystatechange",element,callback) }
function onreset(element,callback=function(){}){ on("reset",element,callback) }
function onresize(element,callback=function(){}){ on("resize",element,callback) }
function onscroll(element,callback=function(){}){ on("scroll",element,callback) }
function onsearch(element,callback=function(){}){ on("search",element,callback) }
function onseeked(element,callback=function(){}){ on("seeked",element,callback) }
function onseeking(element,callback=function(){}){ on("seeking",element,callback) }
function onselect(element,callback=function(){}){ on("select",element,callback) }
function onselectionchange(element,callback=function(){}){ on("selectionchange",element,callback) }
function onsubmit(element,callback=function(){}){ on("submit",element,callback) }
function onsuspend(element,callback=function(){}){ on("suspend",element,callback) }
function ontimeout(element,callback=function(){}){ on("timeout",element,callback) }
function ontimeupdate(element,callback=function(){}){ on("timeupdate",element,callback) }
function ontouchcancel(element,callback=function(){}){ on("touchcancel",element,callback) }
function ontouchend(element,callback=function(){}){ on("touchend",element,callback) }
function ontouchmove(element,callback=function(){}){ on("touchmove",element,callback) }
function ontouchstart(element,callback=function(){}){ on("touchstart",element,callback) }
function ontransitioncancel(element,callback=function(){}){ on("transitioncancel",element,callback) }
function ontransitionend(element,callback=function(){}){ on("transitionend",element,callback) }
function ontransitionstart(element,callback=function(){}){ on("transitionstart",element,callback) }
function onunhandledrejection(element,callback=function(){}){ on("unhandledrejection",element,callback) }
function onunload(element,callback=function(){}){ on("unload",element,callback) }
function onvolumechange(element,callback=function(){}){ on("volumechange",element,callback) }
function onwaiting(element,callback=function(){}){ on("waiting",element,callback) }
function onwheel(element,callback=function(){}){ on("wheel",element,callback) }

// click
function click(element){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				event.click()
			})
		}else{
			element.click()
		}
	}else{
		domgetall(element).forEach(function(event){
			event.click()
		})
	}
}

// on* event END

// dom control START
function innerhtml(element,text,keep=true){
	if(typeof element=="object"){
		if(element.length){
			data=[]

			element.forEach(function(event){
				if(keep){
					event.innerHTML=`
						${event.innerHTML}
						${text}
					`
				}else{
					event.innerHTML=text
				}
				data.push(event.innerHTML)
			})

			return data
		}else{
			if(keep){
				element.innerHTML=`
					${element.innerHTML}
					${text}
				`
			}else{
				element.innerHTML=text
			}
			return element.innerHTML
		}
	}else{
		data=[]

		domgetall(element,function(event){
			if(keep){
				event.innerHTML=`
					${event.innerHTML}
					${text}
				`
			}else{
				event.innerHTML=text
			}
			data.push(event.innerHTML)
		})

		return data
	}
}

function innertext(element,text,keep=true){
	if(typeof element=="object"){
		if(element.length){
			data=[]

			element.forEach(function(event){
				if(keep){
					event.innerText=`
						${event.innerText}
						${text}
					`
				}else{
					event.innerText=text
				}
				data.push(event.innerText)
			})

			return data
		}else{
			if(keep){
				element.innerText=`
					${element.innerText}
					${text}
				`
			}else{
				element.innerText=text
			}
			return element.innerText
		}
	}else{
		data=[]

		domgetall(element,function(event){
			if(keep){
				event.innerText=`
					${event.innerText}
					${text}
				`
			}else{
				event.innerText=text
			}
			data.push(event.innerText)
		})

		return data
	}
}

function value(element,text,keep=false){
	if(typeof element=="object"){
		if(element.length){
			data=[]

			element.forEach(function(event){
				if(keep){
					event.value=`
						${event.value}
						${text}
					`
				}else{
					event.value=text
				}
				data.push(event.value)
			})

			return data
		}else{
			if(keep){
				element.value=`
					${element.value}
					${text}
				`
			}else{
				element.value=text
			}
			return element.value
		}
	}else{
		data=[]

		domgetall(element,function(event){
			if(keep){
				event.value=`
					${event.value}
					${text}
				`
			}else{
				event.value=text
			}
			data.push(event.value)
		})

		return data
	}
}

function getvalue(element){
	if(typeof element=="object"){
		if(element.length){
			let data=[]
			element.forEach(function(event){
				data.push(event.value)
			})
			return data
		}else{
			return element.value
		}
	}else{
		return domgetid(element).value
	}
}

function getinnerhtml(element){
	if(typeof element=="object"){
		if(element.length){
			let data=[]
			element.forEach(function(event){
				data.push(event.innerHTML)
			})
			return data
		}else{
			return element.innerHTML
		}
	}else{
		return domgetid(element).innerHTML
	}
}
// dom control END

function href(url){
	if(url==undefined){
		return location.href
	}else if(url==""){
		location.reload()
	}else{
		location.href=url
	}
}

function dataset(element,key,value=null){
    let elementcount=0

    if(typeof element=="object"){
        if(element){
            if(element.length){
                element.forEach(function(event){
                    elementcount=elementcount+1
                })
            }else{
                if(element){
                    elementcount=1
                }else{
                    console.error("[DOMNOTFOUND_ERROR]function dataset can't find given element")
                    return null
                }
            }
        }else{
            console.error("[DOMNOTFOUND_ERROR]function dataset can't find given element")
            return null
        }
    }else{
        domgetall(element).forEach(function(event){
            elementcount=elementcount+1
        })
    }

    if(0<elementcount){
        let data=[]
        if(typeof element=="object"){
            if(element.length){
                element.forEach(function(event){
                    if(value!=null){
                        event.dataset[key]=value
                    }else if(!event.dataset[key]){
                        console.error("[DOMDATASETNOTFOUND_ERROR]function dataset can't find given dataset")
                        return null
                    }
                    data.push(event.dataset[key])
                })
            }else{
                if(value!=null){
                    element.dataset[key]=value
                }else if(!element.dataset[key]){
                    console.error("[DOMDATASETNOTFOUND_ERROR]function dataset can't find given dataset")
                    return null
                }
                data.push(element.dataset[key])
            }
        }else{
            domgetall(element).forEach(function(event){
                if(value!=null){
                    event.dataset[key]=value
                }else if(!event.dataset[key]){
                    console.error("[DOMDATASETNOTFOUND_ERROR]function dataset can't find given dataset")
                    return null
                }
                data.push(event.dataset[key])
            })
        }
        if(data.length==0){
            console.error("[DOMNOTFOUND_ERROR]function dataset can't find given element")
            return null
        }else if(data.length==1){
            return data[0]
        }else{
            return data
        }
    }else{
        console.error("[DOMNOTFOUND_ERROR]function dataset can't find given element")
        return null
    }
}

function getfile(){
	let url=new URL(window.location.href)
	let pathname=url.pathname
	return pathname.substring(pathname.lastIndexOf("/")+1)
}

function style(element,style=[]){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				for(let i=0;i<style.length;i=i+1){
					event.style[style[i][0]]=style[i][1]
				}
			})
		}else{
			for(let i=0;i<style.length;i=i+1){
				element.style[style[i][0]]=style[i][1]
			}
		}
	}else{
		domgetall(element).forEach(function(event){
			for(let i=0;i<style.length;i=i+1){
				event.style[style[i][0]]=style[i][1]
			}
		})
	}
}

function removestyle(element,style=[]){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				for(let i=0;i<style.length;i=i+1){
					event.style[style[i][0]]="initial"
				}
			})
		}else{
			for(let i=0;i<style.length;i=i+1){
				element.style[style[i][0]]="initial"
			}
		}
	}else{
		domgetall(element).forEach(function(event){
			for(let i=0;i<style.length;i=i+1){
				event.style[style[i][0]]="initial"
			}
		})
	}
}

function addstyle(element,style=[]){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				for(let i=0;i<style.length;i=i+1){
					event.style[style[i][0]]=style[i][1]
				}
			})
		}else{
			for(let i=0;i<style.length;i=i+1){
				element.style[style[i][0]]=style[i][1]
			}
		}
	}else{
		domgetall(element).forEach(function(event){
			for(let i=0;i<style.length;i=i+1){
				event.style[style[i][0]]=style[i][1]
			}
		})
	}
}

function addclass(element,classlist=[]){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				event.classList=event.classList+" "+classlist.join(" ")
			})
		}else{
			element.classList=element.classList+" "+classlist.join(" ")
		}
	}else{
		domgetall(element).forEach(function(event){
			event.classList=event.classList+" "+classlist.join(" ")
		})
	}
}

function removeclass(element,classlist=[]){
	if(typeof element=="object"){
		if(element.length){
			element.forEach(function(event){
				for(let i=0;i<classlist.length;i=i+1){
					event.classList.remove(classlist[i])
				}
			})
		}else{
			for(let i=0;i<classlist.length;i=i+1){
				element.classList.remove(classlist[i])
			}
		}
	}else{
		domgetall(element).forEach(function(event){
			for(let i=0;i<classlist.length;i=i+1){
				event.classList.remove(classlist[i])
			}
		})
	}
}

function getsearchkey(key){
	return new URLSearchParams(location.search).get(key)
}

function getget(key){
	return new URLSearchParams(location.search).get(key)
}

function array(data){
	return Array(data)
}

function json(data){
	return JSON.parse(data)
}

function string(data){
	if(typeof data=="object"){
		return JSON.stringify(data)
	}else{
		return String(data)
	}
}

function str(data){
	if(typeof data=="object"){
		return JSON.stringify(data)
	}else{
		return String(data)
	}
}

function int(data){
	return parseInt(data)
}

function float(data){
	return parseFloat(data)
}

function min(...data){
	return Math.min(...data)
}

function max(...data){
	return Math.max(...data)
}

function prevpage(){
	history.back()
}

function nextpage(){
	history.forward()
}

async function importhtml(element,url,callback=function(){}){
	let data=await fetch(url)
	let text=await data.text()

	domgetall(element).forEach(function(event){
		event.innerHTML=text
		event.querySelectorAll("script").forEach(function(script){
			let newscript=document.createElement("script")
			newscript.textContent=script.textContent
			event.appendChild(newscript)
		})
	})

	callback()
}

async function domload(element,url,callback=function(){}){
	let data=await fetch(url)
	let text=await data.text()

	domgetall(element).forEach(function(event){
		event.innerHTML=text
		event.querySelectorAll("script").forEach(function(script){
			let newscript=document.createElement("script")
			newscript.textContent=script.textContent
			event.appendChild(newscript)
		})
	})

	callback()
}

// testing
function searchtagdiv(element,searchname,data){
    let sys={
        show: false,
        search: "",
        searchresults: [],
        searchData: data,
        fun: function(text) {
            if(text === "") {
                sys.show=false
                document.getElementById("searchtagdiv").style.display="none"
                return
            }
            const searchText=text.toLowerCase()
            sys.searchresults=sys.searchData.filter(item =>
                item.toLowerCase().includes(searchText)
            )
            sys.searchresults.sort((a,b) => {
                return a.length - b.length
            })
            sys.show=sys.searchresults.length > 0
            renderResults()
        }
    }

    function renderResults() {
        document.getElementById("searchtagdiv").innerHTML=""
        if(sys.show) {
            sys.searchresults.forEach((item) => {
                let div=document.createElement("div")
                div.classList="tagdiv"
                div.style.display="flex"
                div.style.marginBottom="8px"
                div.style.width="100%"
                div.style.cursor="pointer"
                div.innerHTML=`<div style="margin: 0; white-space: nowrap; width: 50%; font-weight: bolder;">${item}</div>`
                div.onclick=() => {
                    document.getElementById(searchname).value=item
                    sys.search=item
                    document.getElementById("searchtagdiv").style.display="none"
                }
                document.getElementById("searchtagdiv").appendChild(div)
            })
            document.getElementById("searchtagdiv").style.display="block"
        } else {
            document.getElementById("searchtagdiv").style.display="none"
        }
    }

    document.getElementById(searchname).addEventListener("input",function(e) {
        sys.search=e.target.value
        sys.fun(sys.search)
    })

	document.getElementById(element).innerHTML=`
		<div class="tagdivdiv" id="searchtagdiv" style="display: none;"></div>
	`
}

function rangeslider(target=null,value=null,step=null,set=null,range=false,scale=true,labels=true,tooltip=true,style="roundstyle",lebel="",onchangecallback=null,stylelist=null){
	let input
	let inputdisplay
	let slider
	let sliderwidth
	let sliderleft
	let pointerwidth
	let pointerr
	let pointerl
	let activepointer
	let selecte
	let scale1
	let step1
	let tipl
	let tipr
	let disabled
	let values={
		start: null,
		end: null
	}

	// function START
	function drag(event){
		let dir=event.target.getAttribute("data-dir")

		event.preventDefault()

		if(!disabled){
			if(dir=="left"){
				activepointer=pointerl
			}
			if(dir=="right"){
				activepointer=pointerr
			}

			slider.classList.add("sliding")
		}else{
			return
		}
	}

	function move(event){
		if(activepointer&&!disabled){
			let coordx
			let index

			if(event.type=="touchmove"){
				coordx=event.touches[0].clientX
			}else{
				coordx=event.pageX
			}

			index=Math.round((coordx-sliderleft-(pointerwidth/2))/step1);

			if(index<=0){
				index=0
			}

			if(index>value.length-1){
				index=value.length-1
			}

			if(range){
				if(activepointer==pointerl){
					values.start=index
					if(values.start>=values.end){
						values.start=values.end-1
					}
				}
				if(activepointer==pointerr){
					values.end=index
				}
			}else{
				values.end=index
			}

			setvalue()
		}
	}

	function drop(){
		activepointer=null
	}

	function setvalue(start,end){
		let activepointer


		if(range){
			activepointer="start"
		}else{
			activepointer="end"
		}

		if(start&&value.indexOf(start)>-1){
			values[activepointer]=value.indexOf(start)
		}

		if(end&&value.indexOf(end)>-1){
			values.end=value.indexOf(end)
		}

		if(range&&values.start>=values.end){
			values.end=values.start+1
		}

		pointerl.style.left=(values[activepointer]*step1-(pointerwidth/2))+"px"

		if(range){
			if(tooltip){
				tipl.innerHTML=lebel+""+value[values.start]
				tipr.innerHTML=lebel+""+value[values.end]
			}
			input.value=value[values.start]+","+value[values.end]
			pointerr.style.left=(values.end*step1-(pointerwidth/2))+"px"
		}else{
			if(tooltip){
				tipl.innerHTML=lebel+""+value[values.end]
			}
			input.value=value[values.end];
		}

		if(values.end>value.length-1){
			values.end=value.length-1
		}

		if(values.start<0){
			values.start=0
		}

		selecte.style.width=(values.end-values.start)*step1+"px"
		selecte.style.left=values.start*step1+"px"

		change()
	}

	function change(){
		if(onchangecallback&&typeof onchangecallback=="function"){
			return onchangecallback(getvalue())
		}
	}

	function disable(data){
		disabled=data
		if(disabled){
			slider.classList.add("disabled")
		}else{
			slider.classList.remove("disabled")
		}
	}

	function getvalue(){
		return [value[values.start],value[values.end]]
	}

	function destroy(){
		input.style.display=inputdisplay
		slider.remove()
		return null
	}

	function createElement(el,cls,dataAttr){
		var element=document.createElement(el)
		if(cls) element.className=cls
		if(dataAttr&&dataAttr.length==2){
			element.setAttribute("data-"+dataAttr[0],dataAttr[1])
		}

		return element
	}
	// function END

	// 獲取input DOM
	if(typeof target=="object"){
		input=target
	}else{
		input=document.getElementById(target.replace("#",""))
	}

	if(input){
		inputdisplay=getComputedStyle(input,null).display
		input.style.display="none"
		disabled=input.disabled
		if((value instanceof Array)||(value["min"]!=undefined&&value["max"]!=undefined)){
			// init END

			slider=createElement("div","rangecontainer")
			slider.innerHTML=`<div class="rangebackground"></div>`
			selecte=createElement("div","rangeselected")
			pointerl=createElement("div","rangepointer",["dir","left"])
			scale1=createElement("div","rangescale")

			if(tooltip){
				tipl=createElement("div","rangetooltip")
				tipr=createElement("div","rangetooltip")
				pointerl.appendChild(tipl)
			}
			slider.appendChild(selecte)
			slider.appendChild(scale1)
			slider.appendChild(pointerl)

			if(range){
				pointerr=createElement("div","rangepointer",["dir","right"])
				if(tooltip){
					pointerr.appendChild(tipr)
				}
				slider.appendChild(pointerr)
			}

			slider.classList.add(style)

			input.parentNode.insertBefore(slider,input.nextSibling)
			sliderleft=slider.getBoundingClientRect().left
			sliderwidth=slider.clientWidth
			pointerwidth=pointerl.clientWidth

			if(!scale){
				slider.classList.add("rangenoscale")
			}

			if(disabled){
				slider.classList.add("disabled")
			}else{
				slider.classList.remove("disabled")
			}

			if(!(value instanceof Array)){

				let min=value.min
				let max=value.max
				let range=max-min

				value=[]

				if(step){
					for(let i=0;i<(range/step);i=i+1){
						value.push(min+(i*step))
					}

					if(value.indexOf(max)<0){
						value.push(max)
					}
				}else{
					console.warn("[WARNING]function rangeslider warn: no step defined")
					value=[value.min,value.max]
				}
			}


			values.start=0
			if(range){
				values.end=value.length-1
			}else{
				values.end=0
			}

			if(
				set&&
				set.length&&
				set.length>=1&&
				value.indexOf(set[0])>=0&&
				(!range||(range&&set.length>=2&&value.indexOf(set[1])>=0))
			){
				if(range){
					values.start=value.indexOf(set[0])
					if(set[1]){
						values["end"]=value.indexOf(set[1])
					}else{
						values["end"]=null
					}
				}else{
					values.end=value.indexOf(set[0])
				}
			}

			if(stylelist){
				for(let i=0;i<stylelist.length;i=i+1){
					for(let j=0;j<stylelist[i][1].length;j=j+1){
						stylelist[i][0].style[stylelist[j][0]]=stylelist[j][1]
					}
				}
			}

			step1=sliderwidth/(value.length-1);

			for(let i=0;i<value.length;i=i+1){
				var span=createElement("span")
				let ins=createElement("div")

				span.appendChild(ins)
				scale1.appendChild(span)

				if(i==value.length-1){
					span.style.width="0px"
				}else{
					span.style.width=step1+"px"
				}

				if(!labels){
					if(i==0||i==value.length-1){
						ins.innerHTML=value[i]
					}
				}else{
					ins.innerHTML=value[i]
				}

				ins.style.marginLeft=(ins.clientWidth/2)*-1+"px";
			}

			setvalue()

			slider.querySelectorAll(".rangepointer").forEach(function(event){
				event.onmousedown=function(event){
					drag(event)
				}
				event.ontouchstart=function(event){
					drag(event)
				}
			})

			slider.querySelectorAll("span").forEach(function(event){
				event.onclick=function(event){
					if(!disabled){
						let index=Math.round((event.clientX-sliderleft)/step1)

						if(index>value.length-1){
							index=value.length-1
						}

						if(index<0){
							index=0
						}

						if(range){
							if(index-values.start<=values.end-index){
								values.start=index
							}else{
								values.end=index
							}
						}else{
							values.end=index
						}

						slider.classList.remove("sliding")

						setvalue()
					}else{
						return
					}
				}
			})

			document.onmousemove=function(event){
				move(event)
			}

			document.ontouchmove=function(event){
				move(event)
			}

			document.onmouseup=function(event){
				drop(event)
			}

			document.ontouchend=function(event){
				drop(event)
			}

			document.ontouchcancel=function(event){
				drop(event)
			}

			window.onresize=function(){
				sliderleft=slider.getBoundingClientRect().left
				sliderwidth=slider.clientWidth
				step1=sliderwidth/(value.length-1)

				slider.querySelectorAll("span").forEach(function(event){
					event.style.width=step1+"px"
				})

				setvalue()
			}

			return{
				getvalue: getvalue,
				destroy: destroy,
				disabled: disabled
			}
		}else{
			throw "[KEYTYPEIN_ERROR]function rangeslider error: data missing min or max value"
		}
	}else{
		throw "[DOMNOTFOUND_ERROR]function rangetslider error: target element not find"
	}
}

// (語法: 輪播器的div id,各圖選擇器,是否有左右控制器,是否有下方控制器(dot: 一個點點,line: 一條線,timeline: 依時間滾動,image: 圖片,none: 沒有),更新時間(ms)(-1為不更新))
function carousel(id,carouselimageclass=".carouseimage",leftrightcontroller=true,indexcontroller="dot",carouseltime=1500){
	if(document.getElementById(id)){
		if(typeof leftrightcontroller=="boolean"){
			if(indexcontroller=="none"||indexcontroller=="dot"||indexcontroller=="line"||indexcontroller=="timeline"||indexcontroller=="image"){
				let count=0
				let index=0
				let innerhtml=``
				let totalindex=document.querySelectorAll(carouselimageclass).length

				// change image
				function change(){
					// 將所有圖片隱藏
					document.querySelectorAll(carouselimageclass).forEach(function(element){
						element.style.display="none"
					})

					// 將index圖片顯示
					if(document.querySelectorAll(carouselimageclass)[index]){
						document.querySelectorAll(carouselimageclass)[index].style.display="block"
					}


					if(indexcontroller=="dot"){
						document.querySelectorAll(".carouseldot").forEach(function(event){
							event.style.background="var(--stgray-200)"
						})
						document.querySelectorAll(".carouseldot")[index].style.background="var(--stgray-500)"
					}else if(indexcontroller=="line"){
						document.querySelectorAll(".carouselline").forEach(function(event){
							event.style.background="var(--stgray-200)"
						})
						document.querySelectorAll(".carouselline")[index].style.background="var(--stgray-500)"
					}else if(indexcontroller=="timeline"){

					}else if(indexcontroller=="image"){
						document.querySelectorAll(".carouselimage").forEach(function(event){
							event.style.background="none"
						})
						document.querySelectorAll(".carouselimage")[index].style.background="var(--stgray-200)"
					}

					count=0
				}

				if(leftrightcontroller){
					innerhtml=`
						${innerhtml}
						<input type="button" class="carousebutton carouseprev" id="carouseprev" value="<">
						<input type="button" class="carousebutton carousenext" id="carousenext" value=">">
					`
				}

				if(indexcontroller!="none"){
					let carouselfunction=``

					if(indexcontroller=="dot"){
						for(let i=0;i<totalindex;i=i+1){
							carouselfunction=`
								${carouselfunction}
								<div class="carouseldot" data-id="${i}"></div>
							`
						}
					}else if(indexcontroller=="line"){
						for(let i=0;i<totalindex;i=i+1){
							carouselfunction=`
								${carouselfunction}
								<div class="carouselline" data-id="${i}"></div>
							`
						}
					}else if(indexcontroller=="timeline"){

					}else if(indexcontroller=="image"){
						for(let i=0;i<totalindex;i=i+1){
							carouselfunction=`
								${carouselfunction}
								<div class="carouselimage" data-id="${i}">
									<img src="${document.querySelectorAll(carouselimageclass)[i].src}" alt="image" class="image">
								</div>
							`
						}
					}else{
						throw "function carousel error: indexcontroller parameter KEYTYPEIN error(must be none|timeline|dot|line|image),but wtf tell me how did you did this"
					}


					innerhtml=`
						${innerhtml}
						<div class="carouselfunction">
							${carouselfunction}
						</div>
					`
				}

				document.getElementById(id).innerHTML=`
					${document.getElementById(id).innerHTML}
					${innerhtml}
				`

				if(document.getElementById("carouseprev")){
					document.getElementById("carouseprev").onclick=function(){
						count=0
						if(index-1<0){
							index=totalindex-1
						}else{
							index=(index-1)%totalindex
						}
						change()
					}
				}

				if(document.getElementById("carousenext")){
					document.getElementById("carousenext").onclick=function(){
						count=0
						index=(index+1)%totalindex
						change()
					}
				}

				if(indexcontroller=="dot"){
					document.querySelectorAll(".carouseldot").forEach(function(event){
						event.onclick=function(){
							index=event.dataset.id
							change()
						}
					})
				}else if(indexcontroller=="line"){
					document.querySelectorAll(".carouselline").forEach(function(event){
						event.onclick=function(){
							index=event.dataset.id
							change()
						}
					})
				}else if(indexcontroller=="timeline"){

				}else if(indexcontroller=="image"){
					document.querySelectorAll(".carouselimage").forEach(function(event){
						event.onclick=function(){
							index=event.dataset.id
							change()
						}
					})
				}

				change()
				if(-1<carouseltime){
					setInterval(function(){
						count=count+1
						if(carouseltime/10<=count){
							change()
							index=(index+1)%totalindex
						} // 換圖片
					},10)
				}
			}else{
				throw "[KEYTYPEIN ERROR]function carousel error: indexcontroller parameter KEYTYPEIN error(must be none|timeline|dot|line|image)"
			}
		}else{
			throw "[KEYTYPEIN ERROR]function carousel error: leftrightcontroller is not boolean"
		}
	}else{
		throw "[DOMNOTFOUND ERROR]function carousel error: dom id not found"
	}
}

function dompush(element,dom="div",data=``,setting={}){
	document.querySelectorAll(element).forEach(function(event){
		let createelement=document.createElement(dom)
		let dataset=setting["dataset"]?setting["dataset"]:{}
		if(data!=false){
			createelement.innerHTML=data
		}
		if(setting["id"])
			createelement.id=setting["id"]
		if(setting["class"])
			createelement.classList=setting["class"]
		if(setting["style"])
			createelement.style=setting["style"]
		if(setting["src"])
			createelement.src=setting["src"]
		if(setting["alt"])
			createelement.alt=setting["alt"]
		if(setting["href"])
			createelement.href=setting["href"]
		if(setting["title"])
			createelement.title=setting["title"]
		for(let key in dataset){
			if(dataset.hasOwnProperty(key)){
				createelement.dataset[key]=dataset[key]
			}
		}
		createelement.disabled=setting["disabled"]??false
		createelement.max=setting["max"]??MAXINT
		createelement.min=setting["min"]??MININT
		createelement.multiple=setting["multiple"]??false
		createelement.readonly=setting["readonly"]??false
		createelement.step=setting["step"]??0
		event.appendChild(createelement)
	})
}

function innerhtmlreverse(dom){
	let element=Array.from(dom.children)
	dom.innerHTML=``
	element.reverse().forEach(function(element){
		dom.appendChild(element)}
	)
}

function chash(x,type="encode",encoding="utf-8"){
    function generaterandomstring(length){
        let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result=""
        for(let i=0;i<length;i=i+1){
            let randomindex=Math.floor(Math.random()*chars.length)
            result=result+chars[randomindex]
        }
        return result
    }

    function shufflestring(str){
        let arr=str.split("")
        for(let i=arr.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1))
            let temp=arr[i]
            arr[i]=arr[j]
            arr[j]=temp
        }
        return arr.join("")
    }

    function xorbufs(buf1,buf2){
        let result=new Uint8Array(buf1.length)
        for (let i=0;i<buf1.length;i++){
            result[i]=buf1[i]^buf2[i % buf2.length]
        }
        return result
    }

	if(type=="encode"){
		let encoder=new TextEncoder()
		let t=encoder.encode(str(x))

		let k=encoder.encode(generaterandomstring(40))

		let shuffledt=xorbufs(t,k)
		let l=btoa(String.fromCharCode.apply(null,shuffledt))

		let a=shufflestring(`chash${encoding}`.padEnd(20,"a"))
		let y=generaterandomstring(10)
		let kencoded=btoa(String.fromCharCode.apply(null,k))

		let result=`${a}|${l}|${y}|${kencoded}`

		return result
	}else if(type=="decode"){
		try{
			let [a,l,y,k]=x.split("|")

			let decoder=new TextDecoder(encoding)
			let shuffledt=new Uint8Array(atob(l).split("").map(char => char.charCodeAt(0)))
			let kbuf=new Uint8Array(atob(k).split("").map(char => char.charCodeAt(0)))

			let t=xorbufs(shuffledt,kbuf)

			let originalstring=decoder.decode(t)

			return originalstring
		}catch(error){
			console.error("[CHECKCODE_ERROR]function chash error: check code error")
		}
	}else{
		console.error("[KEYTYPEIN_ERROR]function chash error: type must be \"encode\" or \"decode\"")
	}
}

// 複製功能
function copytoclipboard(element,text,callback=function(event){
    element.value="copy!"
    setTimeout(function(){
        element.value="copy"
    },1500)
}){
    console.log(text)
    navigator.clipboard.writeText(text).then(function(){
        callback(this)
    }).catch(function(error){
        console.error("[FUNCTION_ERROR]function copytoclipboard error: could not copy to clipboard")
        console.error(error)
    })
}

// 用來移除行號的函數
function getcleancode_onlyforcodebeautifierdontuseit(button){
    let element=button.parentNode.parentNode.querySelector(".codebeautifier")
    let oldinnerhtml=element.innerHTML
    let returntext

    element.querySelectorAll(".linenumber").forEach(function(line){
        line.remove()
    }) // 移除行號元素

    returntext=element.innerText // 獲取去除行號的程式碼
    element.innerHTML=oldinnerhtml // 將原本的程式碼元素內容複製到新的元素中

    return returntext
}

function codebeautifier(code,language){
    let keyword={
        "javascript": ["function","return","if","else","for","while","var","let","const","document","console"],
        "js": ["function","return","if","else","for","while","var","let","const"],
        "python": ["def","return","if","elif","else","for","while","import","from","as"],
        "py": ["def","return","if","elif","else","for","while","import","from","as"],
        "html": ["html","head","body","div","span","p","a","img","script","style"]
    }[language]||[]
    let line=""
    let numbercode=""

    function highlight(text,classname){
        return `<span class="${classname}">${text}</span>`
    }

    code=code.replace(/&/g,"&amp").replace(/</g,"&lt").replace(/>/g,"&gt")

    if(["javascript","js","python","py"].includes(language)){
        code=code.replace(
            new RegExp(`\\b(${keyword.join("|")})\\b|(".*?"|'.*?')|(//.*$)|(?:function\\s+(\\w+)\\s*\\(|(?:const|let|var)\\s+(\\w+)\\s*=\\s*(?:function\\s*\\(|\\([^)]*\\)\\s*=>))`,"gm"),
            function(match,keyword,string,comment,functionname1,functionname2){
                if(keyword){ return highlight(keyword,"keyword") }
                if(string){ return highlight(string,"string") }
                if(comment){ return highlight(comment,"comment") }
                if(functionname1||functionname2){
                    return match.replace(functionname1||functionname2,highlight(functionname1||functionname2,"function"))
                }
                return match
            }
        )
    }else{
        code=code.replace(
            new RegExp(`\\b(${keyword.join("|")})\\b|(".*?"|'.*?')|(//.*$)`,"gm"),
            function(match,keyword,string,comment){
                if(keyword){ return highlight(keyword,"keyword") }
                if(string){ return highlight(string,"string") }
                if(comment){ return higaght(comment,"comment") }
                return match
            }
        )
    }

    line=code.split("\n")
    numbercode=line.map(function(line,index){
        return `<span class="linenumber">${index+1}</span>${line}`
    }).join("\n")

    return `
        <div class="codebeautifiermaindiv">
            <div style="display: flex;justify-content: space-between;align-items: center;padding: 5px;">
                <div>${language}</div>
                <input type="button" class="copybutton" onclick="copytoclipboard(this,getcleancode_onlyforcodebeautifierdontuseit(this))" value="copy">
            </div>
            <hr style="margin: 5px 0px;">
            <pre class="codebeautifier ${language}" style="tab-size: 4"><code>${numbercode}</code></pre>
        </div>
    `
}

function char(id,type,label,data){
	if(type=="line"){
		const canvas=document.getElementById(id)
		canvas.style.border="1px black solid"
		canvas.style.background="whitesmoke"
		const paper=canvas.getContext("2d")

		const padding=50
		const chartWidth=canvas.width - padding * 2
		const chartHeight=canvas.height - padding * 2

		// 計算X軸與Y軸的比例
		const xSpacing=chartWidth / (label.length - 1)
		const yMax=Math.max(...data)+10
		const yMin=Math.min(...data)-10
		const yRange=yMax - yMin

		// 繪製X軸和Y軸
		paper.beginPath()
		paper.moveTo(padding,padding)
		paper.lineTo(padding,canvas.height - padding)
		paper.lineTo(canvas.width - padding,canvas.height - padding)
		paper.stroke()

		// 標記X軸標籤
		label.forEach((label,index) => {
			const x=padding + index * xSpacing
			const y=canvas.height - padding

			paper.fillText(label,x - 20,y + 20)  // 調整位置使文字居中
		});

		// 標記Y軸標籤
		const ySteps=5
		for (let i=0; i <= ySteps; i++) {
			const yValue=yMin + (yRange / ySteps) * i
			const y=canvas.height - padding - (chartHeight / ySteps) * i

			paper.fillText(yValue.toFixed(2),padding - 40,y + 5) // 調整位置使文字居中
		}

		// 繪製折線
		paper.beginPath()
		data.forEach((point,index) => {
			const x=padding + index * xSpacing
			const y=canvas.height - padding - (point - yMin) / yRange * chartHeight

			if (index === 0) {
				paper.moveTo(x,y)
			} else {
				paper.lineTo(x,y)
			}
		})
		paper.stroke()
	}
}

// window onload START
onload(window,function(){
	// 刷新lightbox
	if(document.getElementById("lightbox")){
		document.getElementById("lightbox").style.display="none"
		document.getElementById("lightbox").classList.add("lightboxmask")
		setTimeout(function(){
			document.getElementById("lightbox").style.display="block"
		},100)
	}

	// 順滑移動#
	if(location.href.split("#").length>1){
		let id=location.href.split("#")[location.href.split("#").length-1]
		if(document.getElementById(id)){
			document.getElementById(id).scrollIntoView({ behavior: "smooth" })
		}
	}

	// 將被onchange的input|textarea清除error
	onchange("input",function(element,event){
		element.parentNode.classList.remove("error")
	})

	onchange("textarea",function(element,event){
		element.parentNode.classList.remove("error")
	})
})
// window onload END