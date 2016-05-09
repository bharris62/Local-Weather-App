$(document).ready(function() {
            //set up to make API call - using lat and long - using geolocation
            var currentTemp;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                        var apiKey = "8ac4d97f9225c846013e9f689f46d3b8";
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        //
                        (lat + ' ' + long);

                        var myApi = "https://api.forecast.io/forecast/" + apiKey + "/" + lat + "," + long + "?callback=?";
                        //
                        (myApi);

                        $.getJSON(myApi, function(info) {
                                //current weather calls
                                currentTemp = info.currently.temperature.toFixed(0);
                                var currentSummary = info.currently.summary;
                                //var timeZone = info.timezone;
                                var timeZone = new Date(new Date().getTime()).toLocaleTimeString(navigator.language, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                //predictive weather calls
                                var withInHour = info.minutely.summary;
                                var fifteenMinutes = info.minutely.data[15].precipProbability;
                                var thirtyMinutes = info.minutely.data[30].precipProbability;
                                var fortyfiveMinutes = info.minutely.data[45].precipProbability;
                                //console.log(fifteenMinutes);

                                var fifteenDescription = precipDescription(fifteenMinutes);
                                var thirtyDescription = precipDescription(thirtyMinutes);
                                var fortyFiveDescription = precipDescription(fortyfiveMinutes);

                                $(document).ready(function() {
                                        $("#temperature").html(currentTemp + "<sup>o </sup>" + "F");
                                        $("#current-summary").html(currentSummary);
                                        $("#time-zone").html(timeZone);
                                        $("#with-in-hour").html(withInHour);

                                        $('[data-toggle="toggle"]').click(function() {
                                            if ($('.toggle').hasClass('btn-success')) {
                                                $('#temperature').html(changeFarToCels(currentTemp) + "<sup>o </sup>" + "C");
                                            } else {
                                                $("#temperature").html(currentTemp + "<sup>o </sup>" + "F");
                                            }
                                        });

                                        function changeFarToCels(x) {
                                            return ((x - 32) * (5 / 9)).toFixed(0);
                                        }
                                        //TODO add logic to change background color/image based on these AND font color if neccesary.
                                        $(document).ready(function() {
                                            if (currentSummary == 'Partly cloudy' || currentSummary == 'Mostly Cloudy') {
                                                $('#cloud-image').html("<img src='http://postimage.org/' target='_blank'><img src='http://s19.postimg.org/jxu1c6gsv/cloud_and_sun.png' border='0' alt='cloud and sun' />");
                                            } else if (currentSummary == 'Light Rain' || currentSummary == 'Drizzle') {
                                                $('#cloud-image').html("<img src='http://s19.postimg.org/enp2kvwjz/rainy_day.png' border='0' alt='rainy day' />");
                                            } else if (currentSummary == 'Clear') {
                                                $('#cloud-image').html("<img src='http://s19.postimg.org/r4vq81rpr/sunny.png' border='0' alt='sunny' />");
                                            } else if (currentSummary == 'Snow' || currentSummary == 'Light snow') {
                                                $('#cloud-image').html("<img src='http://s19.postimg.org/e203os1hr/snow.png' border='0' alt='snow'/>");
                                            } else {
                                                $('#cloud-image').html("<img src='http://s19.postimg.org/ilccaajdb/overcast.png' border='0' alt='overcast' />");
                                            }

                                        });


                                            }

                                        });

                                });
                        });
                }

                //gets the users location
                function getCity(callback) {
                    $.getJSON('https://freegeoip.net/json/', function(data) {
                        callback(data)
                    })
                }

                getCity(function(data) {
                    var cityState = (data.city + ", " + data.region_code);
                    $('#location').html(cityState);
                })

                //currently not used.
                function precipDescription(x) {
                    if (x < 30) {
                        return "Likely Clear";
                    } else if (x < 50) {
                        return "Possible Precipitation";
                    } else if (x < 75) {
                        return "Precipitation Very Possible";
                    } else if (x <= 100) {
                        return "Precipitation Imminent"
                    }
                }

            });
