function Slotthereum() {
    this.contract = web3.eth.contract([{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGamePlayer','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGameAmount','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGameEnd','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGameHash','outputs':[{'name':'','type':'bytes32'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'numberOfGames','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'getBalance','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGameNumber','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'getMinBetAmount','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'getMaxBetAmount','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGameWin','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGameStart','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'','type':'uint256'}],'name':'games','outputs':[{'name':'player','type':'address'},{'name':'id','type':'uint256'},{'name':'amount','type':'uint256'},{'name':'start','type':'uint8'},{'name':'end','type':'uint8'},{'name':'number','type':'uint8'},{'name':'win','type':'bool'},{'name':'prize','type':'uint256'},{'name':'hash','type':'bytes32'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'gameId','type':'uint256'}],'name':'getGamePrize','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'getGameIds','outputs':[{'name':'','type':'uint256[]'}],'payable':false,'stateMutability':'view','type':'function'},{'payable':true,'stateMutability':'payable','type':'fallback'},{'constant':false,'inputs':[{'name':'_minBetAmount','type':'uint256'}],'name':'setMinBetAmount','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'amount','type':'uint256'}],'name':'withdrawOwner','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'anonymous':false,'inputs':[{'indexed':false,'name':'value','type':'uint8'}],'name':'PointerChanged','type':'event'},{'constant':false,'inputs':[],'name':'withdraw','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'anonymous':false,'inputs':[{'indexed':false,'name':'amount','type':'uint256'}],'name':'MinBetAmountChanged','type':'event'},{'constant':false,'inputs':[],'name':'kill','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'min','type':'uint8'},{'name':'max','type':'uint8'}],'name':'random','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'anonymous':false,'inputs':[{'indexed':true,'name':'player','type':'address'},{'indexed':true,'name':'gameId','type':'uint256'},{'indexed':false,'name':'start','type':'uint8'},{'indexed':false,'name':'end','type':'uint8'},{'indexed':false,'name':'number','type':'uint8'},{'indexed':false,'name':'amount','type':'uint256'},{'indexed':false,'name':'prize','type':'uint256'}],'name':'GameLoose','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'player','type':'address'},{'indexed':true,'name':'gameId','type':'uint256'},{'indexed':false,'name':'start','type':'uint8'},{'indexed':false,'name':'end','type':'uint8'},{'indexed':false,'name':'amount','type':'uint256'}],'name':'GameRoll','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'player','type':'address'},{'indexed':true,'name':'gameId','type':'uint256'},{'indexed':false,'name':'start','type':'uint8'},{'indexed':false,'name':'end','type':'uint8'},{'indexed':false,'name':'number','type':'uint8'},{'indexed':false,'name':'amount','type':'uint256'},{'indexed':false,'name':'prize','type':'uint256'}],'name':'GameWin','type':'event'},{'anonymous':false,'inputs':[{'indexed':false,'name':'amount','type':'uint256'}],'name':'MaxBetAmountChanged','type':'event'},{'constant':false,'inputs':[{'name':'min','type':'uint8'},{'name':'max','type':'uint8'}],'name':'random8','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'start','type':'uint8'},{'name':'end','type':'uint8'}],'name':'placeBet','outputs':[{'name':'','type':'bool'}],'payable':true,'stateMutability':'payable','type':'function'},{'constant':false,'inputs':[{'name':'hash','type':'bytes32'}],'name':'getNumber','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'_maxBetAmount','type':'uint256'}],'name':'setMaxBetAmount','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'nonpayable','type':'function'}]);

    this.rendering = false;
    this.stopped = false;
    this.stopping = -1;

    this.contractInstance = this.contract.at(window.contract_address);
    this.modalIntro = 0;
    this.tabbed = 0;
    this.selectedGame = 0;
    this.eventsInitialized = false;
    this.games = [];
    this.myGames = [];
    this.players = [];
    this.minBetAmount = -1;
    this.maxBetAmount = -1;
    this.numberOfGames = -1;
    this.winCount = 0;
    this.looseCount = 0;
    this.machine;
    var self = this;

    ///////////////////////////////////////////////////////////////////////////
    //
    //  SLOT
    //
    this.stop = function (x) {
        self.stopping = x;
        var position = - ((x * 250) + 2500);

        console.log('top: ' + parseInt($('#a').css('top')) + ' - pos: ' + parseInt(position));

        if ((parseInt($('#a').css('top') + 2500) >= parseInt(position)) && (!self.stopped)) {
            console.log('STOPPING')
            self.stopped = true;
            $('#a').animate({ top: position + 'px' }, 2000, 'easeOutCirc');
        }
    }

    this.spin = function () {
        if (!self.stopped) {
            $('#a').css('top', 0);
            if (self.stopping > -1) {
                stop(self.stopping);
            } else {
                $('#a').animate({ top: '-4500px' }, 1500, 'linear', function () { self.spin() });
            }
        }
    }

    this.start = function () {
        self.stopped = false;
        self.stopping = -1;
        $('#a').animate({ top: '-2250px' }, 1500, 'easeInExpo', function () { self.spin() });
    }

    this.formatN = function (n) {
        return String(Number(n).toFixed(6)).replace('.', ',');
        // return String(Number(n).toFixed(6)).replace('.', ',');
    }

    this.update_profit = function () {
        var slider_bet = document.getElementById('bet_range');
        var a = parseInt(slider_bet.noUiSlider.get()[0]);
        var b = parseInt(slider_bet.noUiSlider.get()[1]);
        var number_count = (b - a) + 1;
        var amount = $('#amount').val();
        var profit = amount * (1 - (number_count/10));

        $('#bet_amount').html(self.formatN(amount));
        $('#bet_profit').html(self.formatN(profit));

        if (number_count > 1)
            $('#bet_numbers').html(number_count + ' numbers');
        else
            $('#bet_numbers').html(number_count + ' number');
    }
    //
    //  SLOT
    //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    //
    //  INIT
    //
    this.init = function () {
        async.waterfall([
            function minBetAmount(done) {
                self.contractInstance.getMinBetAmount(function(error, result) {
                    console.log('getMinBetAmount: ' + result.valueOf())
                    self.minBetAmount = result.valueOf();
                    $('#min_amount').val(web3.fromWei(self.minBetAmount, 'ether'))
                    done(error, self.minBetAmount);
                });
            },
            function maxBetAmount(minBetAmount, done) {
                self.contractInstance.getMaxBetAmount(function(error, result) {
                    console.log('getMaxBetAmount: ' + result.valueOf())
                    self.maxBetAmount = result.valueOf();
                    $('#max_amount').val(web3.fromWei(self.maxBetAmount, 'ether'));

                    self.maxProfit = (parseInt(self.maxBetAmount) * (1 - (1/10)));
                    self.minProfit = (parseInt(minBetAmount) * (1 - (7/10)));

                    // $('#min_profit').val(web3.fromWei(self.minProfit, 'ether'));
                    $('#min_profit').val(web3.fromWei(self.minProfit, 'ether'));
                    $('#max_profit').val(web3.fromWei(self.maxProfit, 'ether'));

                    done(error, self.maxBetAmount);
                });
            },
            function NumberOfgames(maxBetAmount, done) {
                self.contractInstance.numberOfGames(function(error, result) {
                    console.log('getNumberOfGames: ' + result.valueOf())
                    self.numberOfGames = result.valueOf();
                    done(error, self.numberOfGames);
                });
            },
            function games(numberOfGames, done) {
                self.winCount = 0;
                self.looseCount = 0;
                self.games = [];
                self.contractInstance.getGameIds(function(error, result) {
                    var _games = result.valueOf();
                    for (var j = 0; j < _games.length; j++) {
                        var game = new Game(self, _games[j]);
                        self.games.push(game);
                    }
                });
                Materialize.fadeInImage('#play-now-btn');
                Materialize.fadeInImage('#play-now-btn2');
                Materialize.fadeInImage('#bet-btn');
                done(null, null);
            }
        ],
        function (err) {
            if (err) {
                console.error(err);
            }
            self.renderResults();
        });
    };

    this.areAllGamesInitialized = function () {
        var ret = true;
        for (var i = 0; i < self.numberOfGames; i++) {
            if (self.games[i].initialized == false) {
                return false;
            }
        }
        return ret;
    };
    //
    //  INIT
    //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    //
    //  PLACE BET
    //
    this.callWhenMinedSetTimeout = function (hash) {
        setTimeout(function () { self.callWhenMined(hash) }, 1000);
    }

    this.callWhenMined = function (hash) {
        web3.eth.getTransactionReceipt(hash, function (error, result) {
            console.log('getTransactionReceipt> ' + hash);
            if (error) {
                console.log(error)
            } else {
                if (result == null) {
                    self.callWhenMinedSetTimeout(hash);
                } else {
                    if (result.blockNumber == null) {
                        self.callWhenMinedSetTimeout(hash);
                    } else {
                        console.log('DONE!');
                        console.log('tx mined: ' + hash);
                        console.log(result);

                        // result.logs[0].data = '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000038d7ea4c68000';

                        // result.logs[0].data = ''"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000038d7ea4c680000000000000000000000000000000000000000000000000000003e871b540c000"';

                        // self.contractInstance.getGameNumber(self2.callWhenMinedGameId, function(error, result) {
                        //     console.log('NUMBER: ' + result.valueOf());
                        //     self.stop(result.valueOf());
                        //     self.init();
                        // });
                    }
                }
            }
        });
    }

    this.placeBet = function (amount, a, b) {
        var value = amount * 1000000000000000000
        var gas = 300000;
        // var gasPrice = 4000000000;
        console.log('sending from: ' + self.account)

        self.contractInstance.placeBet(a, b, {from: self.account, value: value, gas: gas/*, gasPrice: gasPrice*/}, function(error, result) {
            if (error) {
                console.log('ERROR:');
                console.log(error);
            } else {
                self.start();
                $('#bet-btn').addClass('disabled');
                $('#bet-btn').removeClass('pulse');

                $('#amount').attr('disabled', true);

                var slider_bet = document.getElementById('bet_range');
                var origins = slider_bet.getElementsByClassName('noUi-origin');
                origins[0].setAttribute('disabled', true);
                origins[1].setAttribute('disabled', true);

                $('#tx').html(result);
                $('#tx').attr('href', 'https://etherscan.io/tx/' + result);
                Materialize.fadeInImage('#confirmations');
                // self.callWhenMined(result);

                console.log(result);
            }
        });
    }
    //
    //  PLACE BET
    //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    //
    //  ACCOUNTS
    //
    this.initAccounts = function () {
        self.accounts = [];
        self.account = null;

        web3.eth.getAccounts(function(error, accounts) {
            var account = null;
            accounts.forEach(function(_account) {
                if (account == null) {
                    account = _account;
                }
                $('#dropdown-nav').append('<li class="valign-wrapper"><a href="#!' + _account + '" class="accounts_dropdown_item"><div class="eth-address square">' + _account + '</div> ' + _account + '</a></li>');
            });

            if (account != null) {
                self.changeAccount(account)
                $('#avatar').css('display', 'block');
            } else {
                console.log('No accounts found!');
                $('#alert1').modal('open');
            }

            $('select').material_select();

            $('.accounts_dropdown_item').click(function() {
                var newValue = $(this).attr('href').replace('#!', '');
                console.log(newValue);
                self.changeAccount(newValue)
            });

            self.renderAllIdenticons();

            self.init();
        });
    }

    this.changeAccount = function (address) {
        self.account = address;
        self.renderAvatar(self.account);
        $('#current_account_number').html(self.account);
    }
    //
    //  ACCOUNTS
    //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    //
    //  WITHDRAW
    //
    this.withdraw = function () {
        var gas = 300000;
        self.contractInstance.withdraw({from: self.account, gas: gas}, function(error, result) {
            $('#withdraw-btn').addClass('disabled');
            $('#withdraw-transaction-id').html(result)
            Materialize.fadeInImage('#withdraw-confirmations');
        });
    }
    //
    //  WITHDRAW
    //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    //
    //  EVENTS
    //
    this.initEvents = function () {
        var currentBlockNumber = 0;
        web3.eth.getBlockNumber(function(error, result){
            if(!error)
                currentBlockNumber = result;
            else
                console.error(error);
        })

        var rangeAndPlayer = {player: self.account, fromBlock: currentBlockNumber, toBlock: 'latest'};

        // self.betPlacedEvent = self.contractInstance.BetPlaced(rangeAndPlayer);
        // self.betPlacedEvent.watch(self.betPlaced);

        self.gameWinEvent = self.contractInstance.GameWin(rangeAndPlayer);
        self.gameWinEvent.watch(self.gameWon);

        self.gameLooseEvent = self.contractInstance.GameLoose(rangeAndPlayer);
        self.gameLooseEvent.watch(self.gameLoosed);
    }

    // this.betPlaced = function (error, event) {
    //     if (error) {
    //         console.log('ERROR:');
    //         console.log(error);
    //     } else if (self.account == event.args.player) {
    //         console.log('betPlaced event player: ' + event.args.player);
    //         console.log('event.args.gameId: ' + event.args.gameId);
    //         console.log('event.args.amount: ' + event.args.amount);
    //         console.log('event.args.start: ' + event.args.start);
    //         console.log('event.args.end: ' + event.args.end);

    //         $('#bet-btn').removeClass('disabled');
    //         $('#bet-btn').addClass('pulse');
    //         $('#confirmations').css('opacity', 0);
    //         Materialize.toast('New bet placed', 5000, 'rounded');
    //     }
    // }

    this.rollEnded = function (number) {
        self.stop(number);
        $('#bet-btn').removeClass('disabled');
        $('#bet-btn').addClass('pulse');
        $('#amount').attr('disabled', false);
        $('#confirmations').css('opacity', 0);

        var slider_bet = document.getElementById('bet_range');
        var origins = slider_bet.getElementsByClassName('noUi-origin');
        origins[0].removeAttribute('disabled');
        origins[1].removeAttribute('disabled');
        self.init();
    }

    this.gameWon = function (error, event) {
        if (error) {
            console.log('ERROR:');
            console.log(error);
        } else if (self.account == event.args.player) {
            console.log('gameWinEvent');
            self.rollEnded(event.args.number);
            Materialize.toast('Game #' + event.args.gameId + ' WIN!', 150000, 'rounded, green');
        }
    }

    this.gameLoosed = function (error, event) {
        if (error) {
            console.log('ERROR:');
            console.log(error);
        } else if (self.account == event.args.player) {
            console.log('gameLooseEvent');
            self.rollEnded(event.args.number);
            Materialize.toast('Game #' + event.args.gameId + ' LOSE!', 150000, 'rounded, red');
        }
    }
    //
    //  EVENTS
    //
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    //
    //  RENDER
    //
    this.addGamePlaceHolder = function (gameId) {
        var html = $('#game_placeholder_template').html();
        html = html.replace(/{game_id}/g, gameId);
        $('#games-container').append(html);
    }

    this.stopLoading = function () {
        self.renderAllIdenticons();
        $('#loading').hide();
        $('.page-footer').css('display', 'block');
        $('.main-container').css('display', 'block');
        $('.navbar-fixed').css('display', 'block');
        $('.nav-wrapper').css('background', '#2196F3');
    }

    this.startLoading = function () {
        $('#loading').show();
        $('.page-footer').css('display', 'none');
        $('.main-container').css('display', 'none');
        $('.navbar-fixed').css('display', 'none');
        $('.nav-wrapper').css('background', 'white');
    }

    this.renderIdenticon = function (obj) {
        obj.style.backgroundImage = 'url(' + blockies.create({ seed:obj.innerHTML.toLowerCase(), size: 8, scale: 16}).toDataURL() + ')'
    }

    this.renderAllIdenticons = function () {
        $('.eth-address').each(function(i, obj) {
            self.renderIdenticon(obj)
        });
    }

    this.initUIElements = function () {
        $(document).ready(function() {
            $('.target').pushpin({top: 0, bottom: 1000, offset: 0});

            $('#withdraw-btn').click(function() {
                self.withdraw();
            });

            $('#close-intro-btn').click(function() {
                $('#intro').css('display', 'none');
            });

            $('#close-intro-btn').click(function() {
                $('#intro').css('display', 'none');
            });

            $('#logo-btn').click(function() {
                $('ul.tabs').tabs('select_tab', 'intro');
                window.scrollTo(0, 0);
            });

            $('#play-now-btn, #play-now-btn2').click(function() {
                window.scrollTo(0, 0);
                $('ul.tabs').tabs('select_tab', 'play-now');
            });

            $(window).scroll(function() {
                var opacity = 1 - $(window).scrollTop() / 30;
                if (opacity < 0) {
                    opacity = 0;
                }
                $('.tabs').css('opacity', opacity);
            });

            $('.modal').modal();

            $('.tooltipped').tooltip({delay: 60});

            $('.main-container').css('display', 'block');

            $('input[type=range]').change(function() {
              console.log($('input[type=range]').val());
              $('#bet-number').html($('input[type=range]').val());
            });

            var slider_bet = document.getElementById('bet_range');
            // var slider_amount_1 = document.getElementById('amount_1');
            // var slider_amount_2 = document.getElementById('amount_2');
            // var slider_amount_3 = document.getElementById('amount_3');

            noUiSlider.create(slider_bet, {
                start: [0,4],
                step: 1,
                // tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
                tooltips: [ false, false ],
                connect: true,
                limit: 6,
                range: {
                    'min': 0,
                    'max': 9
                },
                pips: { // Show a scale with the slider
                    mode: 'values',
                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    density: 100
                }
            });

            slider_bet.noUiSlider.on('update', function(){
                var a = parseInt(slider_bet.noUiSlider.get()[0]);
                var b = parseInt(slider_bet.noUiSlider.get()[1]);
                $('.bet-number-btn').addClass('lighten-3');
                for (var i = a; i <= b; i++){
                    $('#bet-number-' + i).removeClass('lighten-3');
                }
                console.log(slider_bet.noUiSlider.get())
                self.update_profit();
            });

            $('#amount').change(function() {
                if ($(this).val().length > 7) { 
                    $(this).val(Number($(this).val()).toFixed(6));
                }
                self.update_profit();
            });

            $('#bet-btn').click(function() {
                var a = parseInt(slider_bet.noUiSlider.get()[0]);
                var b = parseInt(slider_bet.noUiSlider.get()[1]);
                var amount = $('#amount').val();
                self.placeBet(amount, a, b);
            });

            $('#terms').modal('open');
        });
    }

    this.renderAvatar = function (address) {
        $('#avatar').html(address);
        $('#avatar').each(function(i, obj) {
            self.renderIdenticon(obj)
        });
    }

    this.renderResults = function () {
        this.rendering = true;
        var ret = true;
        var content = '';
        for (var i = self.games.length-1; i >= 0; i--) {
            var game = self.games[i];
            var html = $('#game_template').html();
            html = html.replace(/{game_id}/g, game.id);
            html = html.replace(/{player}/g, game.player);
            html = html.replace(/{start}/g, game.start);
            html = html.replace(/{end}/g, game.end);
            html = html.replace(/{amount}/g, web3.fromWei(game.amount, 'ether'));
            balls = '';
            for (var j = 0; j <= 9; j++) {
                if (j == game.number){
                    if (game.win) {
                        balls += '<div class="btn-floating valign-wrapper center-align green bet-number-hist">' + j + '</div>';
                    } else {
                        balls += '<div class="btn-floating valign-wrapper center-align red bet-number-hist">' + j + '</div>';
                    }
                } else if (j >= game.start && j <= game.end) {
                    balls += '<div class="btn-floating valign-wrapper center-align blue bet-number-hist">' + j + '</div>';
                } else{
                    balls += '<div class="btn-floating valign-wrapper center-align blue lighten-3 bet-number-hist">' + j + '</div>';
                }
            }
            html = html.replace(/{bet}/g, balls);

            // html = html.replace('{color}', 'blue lighten-2');

            // var btnHtml = $('#bet_number_template').html().replace(/{number}/g, game.number);
            if (game.win) {
                // btnHtml = btnHtml.replace('{color}', 'green');
                // html = html.replace('{betButton}', btnHtml);
                html = html.replace('{color}', 'green lighten-3');
                html = html.replace(/{prize}/g, web3.fromWei(game.prize, 'ether') + ' ETH');
            } else {
                // btnHtml = btnHtml.replace('{color}', 'red');
                // html = html.replace('{betButton}', btnHtml);
                html = html.replace('{color}', 'red lighten-3');
                html = html.replace(/{prize}/g, '1 WEI');
            }

            content += html;
            // $('#all_games_holder').append(html);
        }

        $('#all_games_holder').html(content);

        $('#min').html('Min. ' + web3.fromWei(self.minBetAmount, 'ether'));
        $('#max').html('Max. ' + web3.fromWei(self.maxBetAmount, 'ether'));

        self.renderAllIdenticons();
        $('.tooltipped').tooltip({delay: 60});
        return ret;
    };
    //
    //  RENDER
    //
    ///////////////////////////////////////////////////////////////////////////

    this.initAccounts();
    this.initUIElements();
    this.initEvents();
    this.rendering = false;
}

function Game(slotthereum, gameId) {
    this.slotthereum = slotthereum;
    this.id = parseInt(gameId);
    this.initialized = false;

    this.contractInstance = slotthereum.contractInstance;

    this.player = '';
    this.amount = -1;
    this.start = -1;
    this.end = -1;
    this.prize = -1;
    this.pointer = -1;
    this.number = -1;
    this.hash = '';
    this.win = false;

    var self = this;

    this.init = function () {
        async.waterfall([
            function(done) {
                self.contractInstance.getGamePlayer(self.id, function(error, result){
                    self.player = result.valueOf();
                    done(error, self.player);
                });
            },
            function(player, done) {
                // console.log('Game id: ' + self.id);
                self.contractInstance.getGameAmount(self.id, function(error, result){
                    self.amount = result.valueOf();
                    done(error, self.amount);
                });
            },
            function(amount, done) {
                // console.log('Game amount: ' + self.amount);
                self.contractInstance.getGameStart(self.id, function(error, result) {
                    self.start = result.valueOf();
                    done(error, self.start);
                });
            },
            function(start, done) {
                // console.log('Game start: ' + self.start);
                self.contractInstance.getGameEnd(self.id, function(error, result) {
                    self.end = result.valueOf();
                    done(error, self.end);
                });
            },
            function(end, done) {
                // console.log('Game end: ' + self.end);
                self.contractInstance.getGameNumber(self.id, function(error, result) {
                    self.number = result.valueOf();
                    done(error, self.number);
                });
            },
            function(number, done) {
                // console.log('Game number: ' + self.number);
                self.contractInstance.getGameHash(self.id, function(error, result) {
                    self.hash = result.valueOf();
                    done(error, self.hash);
                });
            },
            function(hash, done) {
                // console.log('Game hash: ' + self.hash);
                self.contractInstance.getGameWin(self.id, function(error, result) {
                    self.win = result.valueOf();
                    if (!self.win) {
                        self.slotthereum.looseCount++;
                    } else {
                        self.slotthereum.winCount++;
                    }
                    done(error, self.win);
                });
            },
            function(win, done) {
                // console.log('Game win: ' + self.win);
                self.contractInstance.getGamePrize(self.id, function(error, result) {
                    self.prize = result.valueOf();
                    self.initialized = true;
                    self.render();
                    done(error, self.prize);
                });
            },
            function(prize, done) {
                self.contractInstance.getBalance({from: self.account}, function(error, result){
                    var balance = web3.fromWei(result.valueOf(), 'ether');
                    $('#current_account_balance').html(balance + ' ETH');
                    if (balance <= 0) {
                        $('#withdraw-btn').addClass('disabled');
                    } else {
                        $('#withdraw-btn').removeClass('disabled');
                    }
                });
            }
            // function(prize, done) {
            //     // console.log('Game prize: ' + self.prize);
            //     self.initialized = true;
            //     self.render();
            //     done(null, null);
            // },
        ],
        function (err) {
            if (err) {
                console.error(err);
            }
        });
    }

    this.render = function () {
        console.log('redering game: ' + self.id);
        if(self.slotthereum.areAllGamesInitialized()) {
            console.log('ALL GAMES INITIALIZED!!!');
            $('#wins').val(self.slotthereum.winCount);
            $('#losses').val(self.slotthereum.looseCount);
            self.slotthereum.renderResults();
        }
    }

    this.init();
    console.log('game.id >>>> ' + this.id);
}
