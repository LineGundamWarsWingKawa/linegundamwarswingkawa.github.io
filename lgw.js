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
		let inputNewUnitAllRounder = document.getElementById("input-new-unit-all-rounder");
		let inputNewUnitOffensive = document.getElementById("input-new-unit-offensive");
		let inputNewUnitDefensive = document.getElementById("input-new-unit-defensive");
		let inputNewUnitDistruptive = document.getElementById("input-new-unit-distruptive");
		let inputNewUnitSupport = document.getElementById("input-new-unit-support");
		let inputNewUnitRecovery = document.getElementById("input-new-unit-recovery");
		let inputNewRemark = document.getElementById("input-new-remark");
		let inputNewPassword = document.getElementById("input-new-password");

		if (!inputNewLineId.value.trim()) {
			alert("請輸入 Line Id");
			return false;
		}
		if (!inputNewUnitAllRounder.value.trim()) {
			alert("請輸入借用機: 萬能");
			return false;
		}
		if (!inputNewUnitOffensive.value.trim()) {
			alert("請輸入借用機: 攻擊");
			return false;
		}
		if (!inputNewUnitDefensive.value.trim()) {
			alert("請輸入借用機: 防衛");
			return false;
		}
		if (!inputNewUnitDistruptive.value.trim()) {
			alert("請輸入借用機: 妨礙");
			return false;
		}
		if (!inputNewUnitSupport.value.trim()) {
			alert("請輸入借用機: 支援");
			return false;
		}
		if (!inputNewUnitRecovery.value.trim()) {
			alert("請輸入借用機: 回復");
			return false;
		}
		if (!inputNewPassword.value.trim()) {
			alert("請輸入密碼");
			return false;
		}

		data.append("LineId", inputNewLineId.value);
		data.append("UnitAllRounder", inputNewUnitAllRounder.value);
		data.append("UnitOffensive", inputNewUnitOffensive.value);
		data.append("UnitDefensive", inputNewUnitDefensive.value);
		data.append("UnitDistruptive", inputNewUnitDistruptive.value);
		data.append("UnitSupport", inputNewUnitSupport.value);
		data.append("UnitRecovery", inputNewUnitRecovery.value);
		data.append("Remark", inputNewRemark.value);
		data.append("Password", inputNewPassword.value);

		// let lang = document.querySelector('input[name="lang"]:checked').value;
		// if (!lang) {
		// 	lang = 'ZH';
		// }
		// data.append("Lang", lang);

		let xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log("add result:", this.responseText);

				if (this.responseText === "Success") {
					refresh();

					alert("操作成功");

					formNewRecordPopupCard.classList.remove("show");
					inputNewLineId.value = "";
					inputNewUnitAllRounder.value = "";
					inputNewUnitOffensive.value = "";
					inputNewUnitDefensive.value = "";
					inputNewUnitDistruptive.value = "";
					inputNewUnitSupport.value = "";
					inputNewUnitRecovery.value = "";
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

				let inputLineId = document.getElementById("input-line-id");
				let inputUnitAllRounder = document.getElementById("input-unit-all-rounder");
				let inputUnitOffensive = document.getElementById("input-unit-offensive");
				let inputUnitDefensive = document.getElementById("input-unit-defensive");
				let inputUnitDistruptive = document.getElementById("input-unit-distruptive");
				let inputUnitSupport = document.getElementById("input-unit-support");
				let inputUnitRecovery = document.getElementById("input-unit-recovery");
				let inputRemark = document.getElementById("input-remark");
				inputLineId.value = btn.dataset.lineId;
				inputUnitAllRounder.value = btn.dataset.unitAllRounder;
				inputUnitOffensive.value = btn.dataset.unitOffensive;
				inputUnitDefensive.value = btn.dataset.unitDefensive;
				inputUnitDistruptive.value = btn.dataset.unitDistruptive;
				inputUnitSupport.value = btn.dataset.unitSupport;
				inputUnitRecovery.value = btn.dataset.unitRecovery;
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
		let inputUnitAllRounder = document.getElementById("input-unit-all-rounder");
		let inputUnitOffensive = document.getElementById("input-unit-offensive");
		let inputUnitDefensive = document.getElementById("input-unit-defensive");
		let inputUnitDistruptive = document.getElementById("input-unit-distruptive");
		let inputUnitSupport = document.getElementById("input-unit-support");
		let inputUnitRecovery = document.getElementById("input-unit-recovery");
		let inputRemark = document.getElementById("input-remark");
		let inputPassword = document.getElementById("input-password");
		let inputEditPassword = document.getElementById("input-edit-password");

		if (!inputUnitAllRounder.value.trim()) {
			alert("請輸入借用機: 萬能");
			return false;
		}
		if (!inputUnitOffensive.value.trim()) {
			alert("請輸入借用機: 攻擊");
			return false;
		}
		if (!inputUnitDefensive.value.trim()) {
			alert("請輸入借用機: 防衛");
			return false;
		}
		if (!inputUnitDistruptive.value.trim()) {
			alert("請輸入借用機: 妨礙");
			return false;
		}
		if (!inputUnitSupport.value.trim()) {
			alert("請輸入借用機: 支援");
			return false;
		}
		if (!inputUnitRecovery.value.trim()) {
			alert("請輸入借用機: 回復");
			return false;
		}
		if (!inputPassword.value.trim()) {
			alert("請輸入密碼");
			return false;
		}

		data.append("LineId", inputLineId.value);
		data.append("UnitAllRounder", inputUnitAllRounder.value);
		data.append("UnitOffensive", inputUnitOffensive.value);
		data.append("UnitDefensive", inputUnitDefensive.value);
		data.append("UnitDistruptive", inputUnitDistruptive.value);
		data.append("UnitSupport", inputUnitSupport.value);
		data.append("UnitRecovery", inputUnitRecovery.value);
		data.append("Remark", inputRemark.value);
		data.append("Password", inputPassword.value);
		data.append("NewPassword", inputEditPassword.value);

		let btnEditSubmit = document.getElementById("btn-edit-record-submit");
		data.append("Index", btnEditSubmit.dataset.index);
		// data.append("Lang", btnEditSubmit.dataset.lang);

		let xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log("edit result:", this.responseText);

				if (this.responseText === "Success") {
					refresh();

					alert("操作成功");

					formEditRecordPopupCard.classList.remove("show");
					inputLineId.value = "";
					inputUnitAllRounder = "";
					inputUnitOffensive.value = "";
					inputUnitDefensive.value = "";
					inputUnitDistruptive.value = "";
					inputUnitSupport.value = "";
					inputUnitRecovery.value = "";
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
				// unitAllRounder
				let tdUnitAllRounder = document.createElement("td");
				tdUnitAllRounder.appendChild(document.createTextNode(row.data.UnitAllRounder));
				tr.appendChild(tdUnitAllRounder);
				// unitOffensive
				let tdUnitOffensive = document.createElement("td");
				tdUnitOffensive.appendChild(document.createTextNode(row.data.UnitOffensive));
				tr.appendChild(tdUnitOffensive);
				// unitDefensive
				let tdUnitDefensive = document.createElement("td");
				tdUnitDefensive.appendChild(document.createTextNode(row.data.UnitDefensive));
				tr.appendChild(tdUnitDefensive);
				// unitDistruptive
				let tdUnitDistruptive = document.createElement("td");
				tdUnitDistruptive.appendChild(document.createTextNode(row.data.UnitDistruptive));
				tr.appendChild(tdUnitDistruptive);
				// unitSupport
				let tdUnitSupport = document.createElement("td");
				tdUnitSupport.appendChild(document.createTextNode(row.data.UnitSupport));
				tr.appendChild(tdUnitSupport);
				// unitRecovery
				let tdUnitRecovery = document.createElement("td");
				tdUnitRecovery.appendChild(document.createTextNode(row.data.UnitRecovery));
				tr.appendChild(tdUnitRecovery);
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
				editbutton.dataset.unitAllRounder = row.data.UnitAllRounder;
				editbutton.dataset.unitOffensive = row.data.UnitOffensive;
				editbutton.dataset.unitDefensive = row.data.UnitDefensive;
				editbutton.dataset.unitDistruptive = row.data.UnitDistruptive;
				editbutton.dataset.unitSupport = row.data.UnitSupport;
				editbutton.dataset.unitRecovery = row.data.UnitRecovery;
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
				// unitAllRounder
				let tdUnitAllRounder = document.createElement("td");
				tdUnitAllRounder.appendChild(document.createTextNode(row.data.UnitAllRounder));
				tr.appendChild(tdUnitAllRounder);
				// unitOffensive
				let tdUnitOffensive = document.createElement("td");
				tdUnitOffensive.appendChild(document.createTextNode(row.data.UnitOffensive));
				tr.appendChild(tdUnitOffensive);
				// unitDefensive
				let tdUnitDefensive = document.createElement("td");
				tdUnitDefensive.appendChild(document.createTextNode(row.data.UnitDefensive));
				tr.appendChild(tdUnitDefensive);
				// unitDistruptive
				let tdUnitDistruptive = document.createElement("td");
				tdUnitDistruptive.appendChild(document.createTextNode(row.data.UnitDistruptive));
				tr.appendChild(tdUnitDistruptive);
				// unitSupport
				let tdUnitSupport = document.createElement("td");
				tdUnitSupport.appendChild(document.createTextNode(row.data.UnitSupport));
				tr.appendChild(tdUnitSupport);
				// unitRecovery
				let tdUnitRecovery = document.createElement("td");
				tdUnitRecovery.appendChild(document.createTextNode(row.data.UnitRecovery));
				tr.appendChild(tdUnitRecovery);
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
				button.dataset.unitAllRounder = row.data.UnitAllRounder;
				button.dataset.unitOffensive = row.data.UnitOffensive;
				button.dataset.unitDefensive = row.data.UnitDefensive;
				button.dataset.unitDistruptive = row.data.UnitDistruptive;
				button.dataset.unitSupport = row.data.UnitSupport;
				button.dataset.unitRecovery = row.data.UnitRecovery;
				button.dataset.remark = row.data.Remark;
				// button.dataset.lang = row.data.Lang;
				button.textContent = "編輯";
				tdControl.appendChild(button); // <button class="btn btn-send btn-edit btn-edit-record" data-index="1"> Edit </button>
				tr.appendChild(tdControl);

				tbody.appendChild(tr);
				dataList[index].dom = tr;
			});
			initBtn();
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
				return dataList[i].data[key].includes(filter);
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
			let lang = radio.value;
			if (!lang) {
				lang = 'ZH';
			}

			reorderDOM('', lang);
		}
	});
})();
