①課題内容（どんな作品か）
・不動産取引価格情報取得API
・都道府県内市区町村一覧取得API
・Google Maps Platform API(Geocoding API,Maps JavaScript API)

を利用して、不動産の取引データを地図上に表示させるアプリケーションを作成した。

②工夫した点・こだわった点
住所、取引期間をセレクトボックスを大きく表示させることで、直感的に素早く選択できるようにしたこと。

「不動産取引価格情報取得API」のデータ制度の性質上、住所データが大字までしかなかったので、同じ位置にinfowindowを配置せずに、乱数を利用して、すこしずれた位置に配置するようにした。

③質問・疑問（あれば）
時々、
    index.html:1 Uncaught (in promise) He {message: 'initMap is not a function', name: 'InvalidValueError', stack: 'Error\n    at new He (https://maps.googleapis.com/m…lImc&callback=initMap&libraries=&v=weekly:168:521'}
というエラーが出るが、解決できなかった。何度か更新すると、エラーが消える。原因を教えてほしい。

また、「Geocoding API,Maps」に時間当たりの利用制限があったため、データの表示数を30に絞った。本当は全部表示させたい。

④利用手順
（1）38行目付近
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdpWd6K8rzsG0ANiZ9FOnGuUVLCesoLHc&callback=initMap&libraries=&v=weekly"
></script>
“キー“の部分にapi key文字列を入力(別途配布)