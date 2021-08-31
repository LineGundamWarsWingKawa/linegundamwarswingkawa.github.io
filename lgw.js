function initBtn() {
	// 新增
	var btnNewRecord = document.getElementById("btn-new-record");
	var btnNewRecordCancel = document.getElementById("btn-new-record-cancel");
	var btnNewRecordSubmit = document.getElementById("btn-new-record-submit");
	var formNewRecordPopupCard = document.getElementById(
		"form-new-record-popup-card"
	);
	btnNewRecord.onclick = function (e) {
		formNewRecordPopupCard.classList.add("show");
	};
	btnNewRecordCancel.onclick = function (e) {
		formNewRecordPopupCard.classList.remove("show");
	};
	btnNewRecordSubmit.onclick = function (e) {
		let data = new FormData();
		let inputNewLineId = document.getElementById("input-new-line-id");
		let inputNewUnit = document.getElementById("input-new-unit");
		let inputNewOtherUnit = document.getElementById("input-new-other-unit");
		let inputNewRemark = document.getElementById("input-new-remark");
		let inputNewPassword = document.getElementById("input-new-password");

		if (!inputNewLineId.value.trim()) {
			alert("請輸入 Line Id");
			return false;
		}
		if (!inputNewUnit.value.trim()) {
			alert("請輸入隊長機");
			return false;
		}
		if (!inputNewPassword.value.trim()) {
			alert("請輸入密碼");
			return false;
		}

		data.append("LineId", inputNewLineId.value);
		data.append("Unit", inputNewUnit.value);
		data.append("OtherUnit", inputNewOtherUnit.value);
		data.append("Remark", inputNewRemark.value);
		data.append("Password", inputNewPassword.value);

		let lang = document.querySelector('input[name="lang"]:checked').value;;
		if (!lang) {
			lang = 'ZH';
		}
		data.append("Lang", lang);

		let xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log("add result:", this.responseText);

				if (this.responseText === "Success") {
					refresh();

					alert("操作成功");

					formNewRecordPopupCard.classList.remove("show");
					inputNewLineId.value = "";
					inputNewUnit.value = "";
					inputNewOtherUnit.value = "";
					inputNewRemark.value = "";
					inputNewPassword.value = "";
				} else {
					alert("發生錯誤:", this.responseText);
				}

				loading(false);
			}
		});

		xhr.open(
			"POST",
			"https://script.google.com/macros/s/AKfycbxZIccw-pVWiTJysG0_8C1A7APwgSaI0yvRI2Yq2ubMjugRfZZjpaAO2c_It1n9v3Yc/exec"
		);

		xhr.send(data);

		loading(true);
	};

	// 修改
	var btnEditRecord = document.getElementsByClassName("btn-edit-record");
	var btnEditRecordCancel = document.getElementById("btn-edit-record-cancel");
	var btnEditRecordSubmit = document.getElementById("btn-edit-record-submit");
	var formEditRecordPopupCard = document.getElementById(
		"form-edit-record-popup-card"
	);
	for (const index in btnEditRecord) {
		if (Object.hasOwnProperty.call(btnEditRecord, index)) {
			const btn = btnEditRecord[index];
			btn.onclick = function (e) {
				formEditRecordPopupCard.classList.add("show");

				let btnSubmit = document.getElementById(
					"btn-edit-record-submit"
				);
				btnSubmit.dataset.index = btn.dataset.index;
				btnSubmit.dataset.lang = btn.dataset.lang;

				let inputLineId = document.getElementById("input-line-id");
				let inputUnit = document.getElementById("input-unit");
				let inputOtherUnit =
					document.getElementById("input-other-unit");
				let inputRemark = document.getElementById("input-remark");
				inputLineId.value = btn.dataset.lineId;
				inputUnit.value = btn.dataset.unit;
				inputOtherUnit.value = btn.dataset.otherUnit;
				inputRemark.value = btn.dataset.remark;
			};
		}
	}
	btnEditRecordCancel.onclick = function (e) {
		formEditRecordPopupCard.classList.remove("show");
	};
	btnEditRecordSubmit.onclick = function (e) {
		let data = new FormData();
		let inputLineId = document.getElementById("input-line-id");
		let inputUnit = document.getElementById("input-unit");
		let inputOtherUnit = document.getElementById("input-other-unit");
		let inputRemark = document.getElementById("input-remark");
		let inputPassword = document.getElementById("input-password");
		let inputEditPassword = document.getElementById("input-edit-password");

		if (!inputUnit.value.trim()) {
			alert("請輸入隊長機");
			return false;
		}
		if (!inputPassword.value.trim()) {
			alert("請輸入密碼");
			return false;
		}

		data.append("LineId", inputLineId.value);
		data.append("Unit", inputUnit.value);
		data.append("OtherUnit", inputOtherUnit.value);
		data.append("Remark", inputRemark.value);
		data.append("Password", inputPassword.value);
		data.append("NewPassword", inputEditPassword.value);

		let btnEditSubmit = document.getElementById("btn-edit-record-submit");
		data.append("Index", btnEditSubmit.dataset.index);
		data.append("Lang", btnEditSubmit.dataset.lang);

		let xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log("edit result:", this.responseText);

				if (this.responseText === "Success") {
					refresh();

					alert("操作成功");

					formEditRecordPopupCard.classList.remove("show");
					inputLineId.value = "";
					inputUnit.value = "";
					inputOtherUnit.value = "";
					inputRemark.value = "";
					inputPassword.value = "";
					inputEditPassword.value = "";
				} else {
					alert("發生錯誤: " + this.responseText);
				}

				loading(false);
			}
		});

		xhr.open(
			"POST",
			"https://script.google.com/macros/s/AKfycbxZIccw-pVWiTJysG0_8C1A7APwgSaI0yvRI2Yq2ubMjugRfZZjpaAO2c_It1n9v3Yc/exec"
		);

		xhr.send(data);

		loading(true);
	};

	// 說明
	var btnInfo = document.getElementById("btn-info");
	var btnInfoClose = document.getElementById("btn-info-close");
	var infoCard = document.getElementById("info-card");
	btnInfo.onclick = function (e) {
		infoCard.classList.add("show");
	};
	btnInfoClose.onclick = function (e) {
		infoCard.classList.remove("show");
	};
}

function refresh() {
	let dataList = [];

	var xhr = new XMLHttpRequest();
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			// console.log(this.responseText);
			dataList = JSON.parse(this.responseText);
			// console.log(dataList);

			let tbody = document.getElementById("content");
			tbody.innerHTML = "";
			dataList.forEach((row) => {
				let tr = document.createElement("tr");
				// line id
				let tdLineId = document.createElement("td");
				tdLineId.appendChild(document.createTextNode(row.data.LineId));
				tr.appendChild(tdLineId);
				// unit
				let tdUnit = document.createElement("td");
				tdUnit.appendChild(document.createTextNode(row.data.Unit));
				tr.appendChild(tdUnit);
				// other unit
				let tdOtherUnit = document.createElement("td");
				tdOtherUnit.appendChild(
					document.createTextNode(row.data.OtherUnit)
				);
				tr.appendChild(tdOtherUnit);
				// remark
				let tdRemark = document.createElement("td");
				tdRemark.appendChild(document.createTextNode(row.data.Remark));
				tr.appendChild(tdRemark);
				// control
				let tdControl = document.createElement("td");
				let editbutton = document.createElement("button");
				editbutton.className = "btn btn-send btn-edit btn-edit-record";
				editbutton.dataset.index = row.index;
				editbutton.dataset.lineId = row.data.LineId;
				editbutton.dataset.unit = row.data.Unit;
				editbutton.dataset.otherUnit = row.data.OtherUnit;
				editbutton.dataset.remark = row.data.Remark;
				editbutton.textContent = "編輯";
				tdControl.appendChild(editbutton); // <button class="btn btn-send btn-edit btn-edit-record" data-index="1"> Edit </button>
				tr.appendChild(tdControl);

				tbody.appendChild(tr);
			});
			initBtn();
		}
	});
	xhr.open(
		"GET",
		"https://script.google.com/macros/s/AKfycbxZIccw-pVWiTJysG0_8C1A7APwgSaI0yvRI2Yq2ubMjugRfZZjpaAO2c_It1n9v3Yc/exec"
	);

	xhr.send();
}

function loading(display) {
	let divLoading = document.getElementById("loading");
	if (display) {
		divLoading.classList.add("show");
	} else {
		divLoading.classList.remove("show");
	}
}

(function () {
	// get datas
	let dataList = [];

	var xhr = new XMLHttpRequest();
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			dataList = JSON.parse(this.responseText);

			let tbody = document.getElementById("content");
			dataList.forEach((row, index) => {
				let tr = document.createElement("tr");
				// line id
				let tdLineId = document.createElement("td");
				tdLineId.appendChild(document.createTextNode(row.data.LineId));
				tr.appendChild(tdLineId);
				// unit
				let tdUnit = document.createElement("td");
				tdUnit.appendChild(document.createTextNode(row.data.Unit));
				tr.appendChild(tdUnit);
				// other unit
				let tdOtherUnit = document.createElement("td");
				tdOtherUnit.appendChild(
					document.createTextNode(row.data.OtherUnit)
				);
				tr.appendChild(tdOtherUnit);
				// remark
				let tdRemark = document.createElement("td");
				tdRemark.appendChild(document.createTextNode(row.data.Remark));
				tr.appendChild(tdRemark);
				// control
				let tdControl = document.createElement("td");
				let button = document.createElement("button");
				button.className = "btn btn-send btn-edit btn-edit-record";
				button.dataset.index = row.index;
				button.dataset.lineId = row.data.LineId;
				button.dataset.unit = row.data.Unit;
				button.dataset.otherUnit = row.data.OtherUnit;
				button.dataset.remark = row.data.Remark;
				button.dataset.lang = row.data.Lang;
				button.textContent = "編輯";
				tdControl.appendChild(button); // <button class="btn btn-send btn-edit btn-edit-record" data-index="1"> Edit </button>
				tr.appendChild(tdControl);

				tbody.appendChild(tr);
				dataList[index].dom = tr;
			});
			initBtn();

			let lang = document.querySelector('input[name="lang"]:checked');
			if (!lang) {
				lang = 'ZH';
			}
			reorderDOM('', lang);
		}
	});
	xhr.open(
		"GET",
		"https://script.google.com/macros/s/AKfycbxZIccw-pVWiTJysG0_8C1A7APwgSaI0yvRI2Yq2ubMjugRfZZjpaAO2c_It1n9v3Yc/exec"
	);

	xhr.send();

	// sort table
	let sortableElem = document.getElementById("content");
	let columnHead = document.querySelectorAll("th[order]");
	let current_sort_column =
		document.querySelector('th[order="bs"]') ||
		document.querySelector('th[order="sb"]');
	for (i = 0; i < columnHead.length; i++) {
		columnHead[i].addEventListener(
			"click",
			function () {
				let order = this.getAttribute("order");
				let lang = document.querySelector('input[name="lang"]:checked');
				if (!lang) {
					lang = 'ZH';
				}
				let filter = document.getElementById("input-filter").value;
				if (order === "bs" || order === "no") {
					this.setAttribute("order", "sb");
					this.classList.toggle("sb");
					dataList.sort(sortSB(this.getAttribute("s-col")));
					reorderDOM(filter, lang);
				} else if (order === "sb") {
					this.setAttribute("order", "bs");
					this.classList.toggle("bs");
					dataList.sort(sortBS(this.getAttribute("s-col")));
					reorderDOM(filter, lang);
				}
				if (
					current_sort_column != null &&
					current_sort_column != this
				) {
					current_sort_column.setAttribute("order", "no");
				}
				current_sort_column = this;
			},
			false
		);
	}

	function reorderDOM(filter, lang) {
		cleanDOM();

		for (var i = 0; i < dataList.length; i++) {
			let found = Object.keys(dataList[i].data).filter(function(key) {
				if (dataList[i].data.Lang == lang) {
					return dataList[i].data[key].includes(filter);
				}
			});
			if (found.length) {
				sortableElem.appendChild(dataList[i].dom);
			}
		}
	}

	function cleanDOM() {
		let tbody = document.getElementById("content");
		tbody.innerHTML = "";
	}

	function sortSB(column) {
		return function (a, b) {
			if (a.data[column] < b.data[column]) {
				return -1;
			}
			if (a.data[column] > b.data[column]) {
				return 1;
			}
			return 0;
		};
	}

	function sortBS(column) {
		return function (a, b) {
			if (a.data[column] < b.data[column]) {
				return 1;
			}
			if (a.data[column] > b.data[column]) {
				return -1;
			}
			return 0;
		};
	}

	// filter
	// input-filter
	let inputFilter = document.getElementById("input-filter");
	inputFilter.onkeyup = function (event) {
		let filter = inputFilter.value;
		let lang = document.querySelector('input[name="lang"]:checked');
		if (!lang) {
			lang = 'ZH';
		}
		reorderDOM(filter, lang);
	};

	// lang filter
	let langRadios = document.getElementsByName('lang');
	langRadios.forEach(function(radio) {
		radio.onclick = function(e) {
			let filter = inputFilter.value;
			let lang = radio.value;
			if (!lang) {
				lang = 'ZH';
			}

			reorderDOM(filter, lang);
		}
	});
})();
