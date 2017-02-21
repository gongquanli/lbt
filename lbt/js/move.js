
// getStyle：获取对象样式对应属性的值
	// 参数：
	//     对象， obj
	//     属性， attr
	//  返回值： 对应属性的值
	
function getStyle(obj, attr) {
	
	var objStyle = null;
	if (window.getComputedStyle) {
		objStyle = getComputedStyle(obj);
	} else {
		objStyle = obj.currentStyle;
	}
	
	return objStyle[attr];
}



function startMove(obj, attr, iTarget, fn) {
	
	
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		
		// 1. 得到当前的值
		var current = parseInt(getStyle(obj, attr));
		if (attr == "opacity") {
			// 0.3 ==> 0
			current = parseFloat(getStyle(obj, attr));
			current *= 100;
			current = Math.round(current);
		}
		
		// 2. 计算速度
		//     缓冲速度
		var speed = (iTarget - current) / 8;
		
		//   0.3 ===> 0
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		
		// 3. 判断终止条件
		if (current == iTarget) {
			clearInterval(obj.timer);
			
			// 动作完成，调用回调函数
//			if (fn) {
//				fn();
//			}
			
			// 与上面的if等价转换，相当于 fn 存在才执行fn()
			fn && fn();
			
			return ;
		}
		
		console.log(current, iTarget);
		
		// 4. 更新当前的位置
		obj.style[attr] = current + speed + "px";
		if (attr == "opacity") {
			obj.style.opacity = (current + speed) / 100;
			obj.style.filter = "alpha(opacity="+current + speed+")";
		}
	}, 50);

}