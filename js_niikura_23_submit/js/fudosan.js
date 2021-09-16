//変数は"today"とする
    var today=new Date(); 

//年・月・日・曜日・時間を取得
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var week = today.getDay();
    var day = today.getDate();
    var week_ja= ["日","月","火","水","木","金","土"];
    var hour = today.getHours();
    var minute = today.getMinutes();

// 都道府県コード一覧をつくる
    const prefectures_code = {
        "prefectures": [{ "id": "01", "name": "北海道"},
            { "id": "02", "name": "青森県"},
            { "id": "03", "name": "岩手県"},
            { "id": "04", "name": "宮城県"},
            { "id": "05", "name": "秋田県"},
            { "id": "06", "name": "山形県"},
            { "id": "07", "name": "福島県"},
            { "id": "08", "name": "茨城県"},
            { "id": "09", "name": "栃木県"},
            { "id": 10, "name": "群馬県"},
            { "id": 11, "name": "埼玉県"},
            { "id": 12, "name": "千葉県"},
            { "id": 13, "name": "東京都"},
            { "id": 14, "name": "神奈川県"},
            { "id": 15, "name": "新潟県"},
            { "id": 16, "name": "富山県"},
            { "id": 17, "name": "石川県"},
            { "id": 18, "name": "福井県"},
            { "id": 19, "name": "山梨県"},
            { "id": 20, "name": "長野県"},
            { "id": 21, "name": "岐阜県"},
            { "id": 22, "name": "静岡県"},
            { "id": 23, "name": "愛知県"},
            { "id": 24, "name": "三重県"},
            { "id": 25, "name": "滋賀県"},
            { "id": 26, "name": "京都府"},
            { "id": 27, "name": "大阪府"},
            { "id": 28, "name": "兵庫県"},
            { "id": 29, "name": "奈良県"},
            { "id": 30, "name": "和歌山県"},
            { "id": 31, "name": "鳥取県"},
            { "id": 32, "name": "島根県"},
            { "id": 33, "name": "岡山県"},
            { "id": 34, "name": "広島県"},
            { "id": 35, "name": "山口県"},
            { "id": 36, "name": "徳島県"},
            { "id": 37, "name": "香川県"},
            { "id": 38, "name": "愛媛県"},
            { "id": 39, "name": "高知県"},
            { "id": 40, "name": "福岡県"},
            { "id": 41, "name": "佐賀県"},
            { "id": 42, "name": "長崎県"},
            { "id": 43, "name": "熊本県"},
            { "id": 44, "name": "大分県"},
            { "id": 45, "name": "宮崎県"},
            { "id": 46, "name": "鹿児島県"},
            { "id": 47, "name": "沖縄県"}]
        };

// 都道府県選択タブをforでつくる
    const prefectures_code_length = Object.keys(prefectures_code.prefectures).length;
    for (let i = 0; i < prefectures_code_length; i++) {
        let prefectures_option = `
        <option value="${prefectures_code.prefectures[i].id}">${prefectures_code.prefectures[i].name}  (${prefectures_code.prefectures[i].id})</option>
        `;
        $("#prefectures_select").append(prefectures_option);
    }


// 選択した都道府県の市町村選択タブもforでつくる
// 都道府県が選択されたら、getJSONでサイトからデータを取得して、オプションを作成する

    $("#prefectures_select").on("change",function(){

        // 都道府県を選択したらマップを移動する
        codeAddress();

        // 選択した都道府県コードを取得する
        let para_area = document.getElementById("prefectures_select").value;
        console.log(para_area);

        $.getJSON(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${para_area}`,
            function(areaapi) {
                console.dir(areaapi);

                // 市町村のデータ長さを取得する
                let shichosons_length = Object.keys(areaapi.data).length;
                console.log(shichosons_length);

                $("#shichosons_select").html(`
                <option value="">市町村を下記から選択してください</option>
                `);
                
                for (let j = 0; j < shichosons_length; j++) {
                    let shichosons_option = `
                    <option value="${areaapi.data[j].id}">${areaapi.data[j].name}  (${areaapi.data[j].id})</option>
                    `;

                    $("#shichosons_select").append(shichosons_option);
                };

            }
        )


    });

// 選択した市町村コードを取得する
    $("#shichosons_select").on("change",function(){

        // 市町村を選択したらマップを移動する
        codeAddress_2();

        // 選択した市町村コードを取得する
        let para_city = document.getElementById("shichosons_select").value;
        console.log(para_city);

    });

// 取引時期のセレクトボックスをつくろう
    for (let j = 2006; j < year; j++) {
        let time_from_option = `
        <option value="${j}">西暦${j}年</option>
        `;

        $("#time_from").append(time_from_option);
    };

// 取引時期を選択したら、取得する
    $("#time_from").on("change",function(){
        // 選択した取引時期の始期を取得する
        let val_time_from = document.getElementById("time_from").value;
        let para_from = val_time_from + "1";
        console.log(para_from);

        $("#time_to").html(`
        <option value="">西暦〇年まで</option>
        `);
        
        for (let j = val_time_from; j < year; j++) {
            let time_to_option = `
            <option value="${j}">西暦${j}年</option>
            `;
        
            $("#time_to").append(time_to_option);
        };


    });

    $("#time_to").on("change",function(){

        // 選択した取引時期の終期を取得する
        let val_time_to = document.getElementById("time_to").value;
        let para_to = val_time_to + "4";
        console.log(para_to);
        
    });

// 以下googlemapsAPIからコピペ（APIKEY入力済）
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var geocoder;
let map;


function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(35.682530911945406, 139.75281938080695);
    var mapOptions = {
    zoom: 14,
    center: latlng,
    mapTypeId: 'terrain'
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

};




// 都道府県が選択されたら、センターを移動させる
function codeAddress() {
    let obj = document.getElementById("prefectures_select");
    let idx = obj.selectedIndex;       //インデックス番号を取得
    // var val = obj.options[idx].value;  //value値を取得
    let txt  = obj.options[idx].text;  //ラベルを取得
    let splitresult1 = txt.split("(");
    let address1 = splitresult1[0];

    geocoder.geocode( { 'address': address1}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        map.setZoom( 10 ) ;

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}

// 市町村が選択されたら、センターを移動させる
function codeAddress_2() {
    let obj = document.getElementById("prefectures_select");
    let idx = obj.selectedIndex;       //インデックス番号を取得
    // var val = obj.options[idx].value;  //value値を取得
    let txt  = obj.options[idx].text;  //ラベルを取得
    let splitresult2 = txt.split("(");
    let address2 = splitresult2[0];

    let obj2 = document.getElementById("shichosons_select");
    let idx2 = obj2.selectedIndex;       //インデックス番号を取得
    // var val = obj.options[idx].value;  //value値を取得
    let txt2  = obj2.options[idx2].text;  //ラベルを取得
    let splitresult3 = txt2.split("(");
    let address3 = splitresult3[0];


    let address4 = splitresult2[0] + splitresult3[0];
    console.log(address4);

    geocoder.geocode( { 'address': address4}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        map.setZoom( 15 ) ;

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}


let kekka_array = {};

// 取引データを表示させるfuctionの定義
function kekkahyoji(dealapi){
    console.dir(dealapi.data);
            
    // 取引データ長さを取得する
    let dealdata_length = Object.keys(dealapi.data).length;
    console.log("取引データの数は" + dealdata_length);

    $("#takuchi_output,#tatemono_output,#mansion_output,#nochi_output,#rinchi_output").html("");
    
    for (let j = 0; j < 30 + dealdata_length*0; j++) {    //geocodeの処理限度に応じてi-9までに制限している

        let tradeprice = Number(dealapi.data[j].TradePrice).toLocaleString();
        let area = Number(dealapi.data[j].Area).toLocaleString();
        let priceperunit = Math.floor(Number(Number(dealapi.data[j].TradePrice)/Number(dealapi.data[j].Area)/0.3025)).toLocaleString();
        let totalfloorarea = Number(dealapi.data[j].TotalFloorArea).toLocaleString();
        let trade_type = dealapi.data[j].Type;
        let dealdata_j = `
        <div class = "dealdata_unit">
        <p>データ${j}</p>
        <p>取引時点	${dealapi.data[j].Period.slice(0,-5)}</p>
        <p>不動産タイプ	${dealapi.data[j].Type}</p>
        <p>${dealapi.data[j].Prefecture} ${dealapi.data[j].Municipality} ${dealapi.data[j].DistrictName}</p>
        <p>取引価格	${tradeprice} 円</p>
        <p>面積	${area} ㎡</p>
        <p class = "tubotanka">坪単価	${priceperunit}円</p>
        <p>延床面積	${totalfloorarea} ㎡</p>
        <p>建築年	${dealapi.data[j].BuildingYear}</p>
        <p>前面道路：種類	${dealapi.data[j].Classification}</p>
        <p>幅員 ${dealapi.data[j].Breadth} ｍ</p>
        <p>都市計画	${dealapi.data[j].CityPlanning}</p>
        </div>
        `;

        if ( trade_type === "宅地(土地)") {
            $("#takuchi_output").append(dealdata_j);

        } else if ( trade_type === "宅地(土地と建物)") {
            $("#tatemono_output").append(dealdata_j);

        } else if ( trade_type === "中古マンション等") {
            $("#mansion_output").append(dealdata_j);

        } else if ( trade_type === "農地") {
            $("#nochi_output").append(dealdata_j);

        } else {
            $("#rinchi_output").append(dealdata_j);

        };

        // infowindowを表示させる
        let infowindow = new google.maps.InfoWindow({
            content: `
                No.${j} ${dealapi.data[j].Type}<br>
                @ ${priceperunit}円
            `,
            maxWidth: 200,
          });

          let address_kekka = `${dealapi.data[j].Prefecture} + ${dealapi.data[j].Municipality} + ${dealapi.data[j].DistrictName}`;


        setTimeout( function(){
    
            geocoder.geocode( { 'address': address_kekka}, function(results, status) {

                if (status == 'OK') {

                    kekka_array[j] = {"dname" : dealapi.data[j].DistrictName, "dlatlng":{"lat": results[0].geometry.location.lat(), "lng": results[0].geometry.location.lng()} };
                    console.log(kekka_array);

                    // 乱数で表示位置をばらけさせる
                    let ransurad = Math.random() * Math.PI * 2;
                    let anchor_tate = results[0].geometry.location.lat() + 0.0090133729745762  * 0.8 * Math.sin(ransurad);
                    let anchor_yoko = results[0].geometry.location.lng() + 0.010966404715491394 * 0.8 * Math.cos(ransurad);
                    let myLatLng = { lat: anchor_tate, lng: anchor_yoko };
                    console.log(myLatLng);


                    let marker = new google.maps.Marker({
                        position: myLatLng,//positionを乱数で800mずらしている
                        map,
                        title: `${j}`,
                        icon: {
                            fillColor: "#FFFFBB",                //塗り潰し色
                            fillOpacity: 0.5,                    //塗り潰し透過率
                            path: google.maps.SymbolPath.CIRCLE, //円を指定
                            scale: 3,                           //円のサイズ
                            strokeColor: "#FFFFBB",              //枠の色
                            strokeWeight: 1.0                    //枠の透過率   
                                                        }
                    });
            
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                        console.log(`${j} 吹き出し表示させました`);
            
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }

            });
        
        }, j * 1100);


    };

    console.log("処理はおわりました");
};


// 取引データを表示させる
    $("#button").on("click",function(){
        let para_area = document.getElementById("prefectures_select").value;
        let para_city = document.getElementById("shichosons_select").value;
        let val_time_from = document.getElementById("time_from").value;
        let para_from = val_time_from + "1"; //第一四半期コード=1
        let val_time_to = document.getElementById("time_to").value;
        let para_to = val_time_to + "4"; //第4四半期コード=4

        if (para_area === "") {
            console.log("areaが定義されていない");
        }else if (para_from === "") {
            console.log("fromが定義されていない");
        }else if (para_to === "") {
            console.log("toが定義されていない");
        }else{
            console.log("検索条件は定義されました");

            // 都道府県検索か市町村検索か
            if (para_city === "") {
                
                $.getJSON(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=${para_from}&to=${para_to}&area=${para_area}`,
                    
                function(dealapi) {
                        kekkahyoji(dealapi);
                    }

                );


            } else {

                $.getJSON(`https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=${para_from}&to=${para_to}&city=${para_city}`,
                    function(dealapi) {
                        kekkahyoji(dealapi);
                    }
                );

            };



        };

    });

