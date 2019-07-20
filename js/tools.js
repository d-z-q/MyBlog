//记录瀑布流每列的高
var arr = [];

//获取当前节点的所有兄弟节点
function siblings(curNode) {
	var nodes = [];
	if (curNode) {
		var arr = curNode.parentNode.children;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].nodeType == 1 && arr[i] != curNode) {
				nodes.push(arr[i]);
			}
		}
	}
	return nodes;
}


window.onload = function() {
	waterFull(false);
}
//竖直方向瀑布流实现
function waterFull(flag) {
	//获取图片父级
	var photos = document.getElementsByClassName("photos")[0];
	//获取父级及子级首个元素的宽度
	var photoW = photos.offsetWidth;
	console.log(photoW);
	var items = photos.getElementsByClassName("photo-item");
	var itemW = items[0].offsetWidth;
	console.log(itemW);
	//求出最小列数
	var minCol = parseInt(photoW / itemW);
	console.log(minCol);
	//求出间距
	var dis = (photoW - itemW * minCol) / (minCol - 1);
	if (!flag) {
		dis = 0;
	}
	console.log('间距' + dis);
	console.log("元素个数：" + items.length);
	//遍历图片设置位置items.length
	for (var i = 0; i < items.length; i++) {
		if (i < minCol) {
			//首行不用设置top
			items[i].style.left = (itemW + dis) * i + 'px';
			arr[i] = items[i].offsetHeight;
			console.log(arr);
		} else {
			var obj = getMinHeightAndIndex(arr);
			var minH = obj.minH;
			var minI = obj.minI;
			//设置第2行之后的图片位置
			items[i].style.left = (itemW + dis) * minI + 'px';
			items[i].style.top = minH + dis + 'px';
			//刷新数组信息
			arr[minI] = minH + dis + items[i].offsetHeight;
		}

	}
}

//记录数组中最小高度及其索引值
function getMinHeightAndIndex(arr) {

	var obj = {};
	obj.minH = arr[0];
	obj.minI = 0;
	for (var i = 1; i < arr.length; i++) {
		if (obj.minH > arr[i]) {
			obj.minH = arr[i];
			obj.minI = i;
		}

	}

	return obj;
}
