/*!
 * Distpicker v1.0.2
 * https://github.com/tshi0912/city-picker
 *
 * Copyright (c) 2014-2016 Tao Shi
 * Released under the MIT license
 *
 * Date: 2016-02-29T12:11:36.473Z
 */

(function (factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define('ChineseDistricts', [], factory);
    } else {
        // Browser globals.
        factory();
    }
})(function () {

    var ChineseDistricts = {
        86: {
            'A-G': [],
            'H-K': [],
            'L-S': [],
            'T-Z': []
        }
    };

    $.ajax({
        type: "get",
        url: "http://mgr.babatruck.com/address/JsonAddr",
        //dataType:"json",//数据类型是jsonp
        jsonp: "callback",//参数为callback
        jsonpCallback: "my",
        async: false,
        success: function (data) {

            var tbody = "";
            //------------遍历对象 .each的使用-------------
            //对象语法JSON数据格式(当服务器端回调回来的对象数据格式是json数据格式，必须保证JSON的格式要求，回调的对象必须使用eval函数进行转化（否则将得不到Object）。)
            $("#result").html("------------遍历对象 .each的使用-------------");
            // alert(data); //是个object元素
            data =  eval(data);

            //下面使用each进行遍历
            $.each(data, function (n, province) {
                var trs = "";
                trs += "<tr><td>" + province.id + "</td> <td>" + province.name + "</td></tr>";
                var provinceName =province.name;
                var provinceId =province.id;
                //取name里面的首字母
                var position = provinceName.indexOf("-");
                var szm = provinceName.substr(position+1,1);
                if(szm=='a' || szm=='b'|| szm=='c'|| szm=='d'|| szm=='e'|| szm=='f'|| szm=='g'){
                    ChineseDistricts['86']['A-G'].push({
                        "code":provinceId,
                        "address":provinceName.substr(0,position)
                    })
                }
                if(szm=='h' || szm=='i'|| szm=='j'|| szm=='k'){
                    ChineseDistricts['86']['H-K'].push({
                        "code":provinceId,
                        "address":provinceName.substr(0,position)
                    })
                }
                if(szm=='l' || szm=='m'|| szm=='n'|| szm=='o'|| szm=='p'|| szm=='q'|| szm=='r'|| szm=='s'){
                    ChineseDistricts['86']['L-S'].push({
                        "code":provinceId,
                        "address":provinceName.substr(0,position)
                    })
                }
                if(szm=='t' || szm=='u'|| szm=='v'|| szm=='w'|| szm=='x'|| szm=='y'|| szm=='z'){
                    ChineseDistricts['86']['T-Z'].push({
                        "code":provinceId,
                        "address":provinceName.substr(0,position)
                    })
                }
                //创建省级对象
                ChineseDistricts[provinceId] = {};

                //处理市级
                var cityData = province.sub;
                $.each(cityData, function (n, city) {
                    var cityId = city.id;
                    var cityName = city.name.substr(0,city.name.indexOf("-"));
                    // trs += "<tr><td>" + city.id + "</td> <td>" + city.name + "</td></tr>";
                  //往对应的省级对象里面填充地级市
                    ChineseDistricts[provinceId][cityId] = cityName;
                    //创建市级对象
                    ChineseDistricts[cityId] = {};

                    //处理县级
                    var areaData = city.sub;
                    $.each(areaData, function (n, area) {
                        var areaId = area.id;
                        var areaName = area.name.substr(0,area.name.indexOf("-"));
                        areaName = $.trim(areaName);//处理空字符
                        areaName = areaName.replace('null','');
                        // trs += "<tr><td>" + area.id + "</td> <td>" + area.name + "</td></tr>";
                        //往对应的市级对象里面填充区县
                        ChineseDistricts[cityId][areaId] = areaName;

                    });

                });


                tbody += trs;
            });

            $("#project").append(tbody);


        }
    })


    if (typeof window !== 'undefined') {
        window.ChineseDistricts = ChineseDistricts;
    }
    // alert(JSON.stringify(ChineseDistricts));
    return ChineseDistricts;

});
