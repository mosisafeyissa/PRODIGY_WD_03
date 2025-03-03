window.ttt = {
    turn: "X",
    turnNum: 0,
    mode: null,
    wins: {
        X: 0,
        O: 0,
        Draw: 0
    },
    outcomes: {
        "outcome 1": [0, 1, 2],
        "outcome 2": [3, 4, 5],
        "outcome 3": [6, 7, 8],
        "outcome 4": [0, 3, 6],
        "outcome 5": [1, 4, 7],
        "outcome 6": [2, 5, 8],
        "outcome 7": [0, 4, 8],
        "outcome 8": [2, 4, 6]
    },
    menu: {
        main: document.getElementById("menu-main"),
        mode: document.getElementById("menu-mode"),
        help: document.getElementById("menu-help"),
        about: document.getElementById("menu-about"),
        game: document.getElementById("menu-game")
    },
    showMenu: function(t) {
        var e;
        for (e in ttt.menu) ttt.menu[e].style.display = t == e ? "" : "none"
    },
    startGame: function(t, e) {
        var n, o = document.getElementById("game-board"),
            m = document.getElementById("game-title"),
            a = document.getElementById("game-turn"),
            u = 9,
            r = 0,
            s = 0,
            c = "";
        for (document.getElementById("start-game").style.display = "none", document.getElementById("game-replay").style.display = "none", document.getElementById("continue-game").style.display = "", document.getElementById("quit-game").style.display = ""; u-- > 0;) c += (0 == s++ ? '<div id="row' + r + '" class="row">' : "") + '<div id="s' + u + '" class="square" onclick="ttt.mark(this);"></div>' + (3 == s ? "</div>" : ""), 3 == s && (s = 0, r++);
        o.innerHTML = c, o.className = ("cpu" == t ? "single" : "multi") + "-player turn-x", ttt.turn = "X", ttt.turnNum = 0, a.innerHTML = '<span class="mark-x">X</span>\'s turn', "new" == e && (ttt.mode = t, ttt.wins = {
            X: 0,
            O: 0,
            Draw: 0
        }, m.innerHTML = "Tic-Tac-Toe - " + ("cpu" == t ? "Single" : "Two") + " Player");
        for (n in ttt.wins) document.getElementById("score-" + n.toLowerCase()).innerHTML = '<span class="mark-' + n.toLowerCase() + '">' + n + "</span>: " + ttt.wins[n];
        ttt.showMenu("game")
    },
    quitGame: function() {
        confirm("Are you sure you want to quit your current game? Your progress will be lost.") && (document.getElementById("start-game").style.display = "", document.getElementById("continue-game").style.display = "none", document.getElementById("quit-game").style.display = "none")
    },
    mark: function(t) {
        var e, n = document.getElementById("game-board"),
            o = document.getElementById("game-turn");
        if (t.onclick = null, t.className += " marked", t.innerHTML = '<span class="mark-' + ttt.turn.toLowerCase() + '">' + ttt.turn + "</span>", ttt.turnNum++, "over" == (e = ttt.checkStatus()).state) {
            o.innerHTML = "Draw" == e.winner ? "DRAW!" : '<span class="mark-' + e.winner.toLowerCase() + '">' + e.winner + "</span> WINS!", n.className += " game-over", document.getElementById("game-replay").style.display = "";
            var m = document.getElementById("score-" + e.winner.toLowerCase());
            m.innerHTML = m.innerHTML.replace(/\d+/, ++ttt.wins[e.winner])
        } else ttt.turn = "X" == ttt.turn ? "O" : "X", o.innerHTML = '<span class="mark-' + ttt.turn.toLowerCase() + '">' + ttt.turn + "</span>'s turn", n.className = n.className.replace(/turn-(?:x|o)/, "turn-" + ttt.turn.toLowerCase()), "cpu" == ttt.mode && "O" == ttt.turn && window.setTimeout(ttt.cpuCalculate, 500)
    },
    checkStatus: function() {
        var t, e, n, o, m, a, u;
        for (n in ttt.outcomes) {
            for (t = 0, e = ttt.outcomes[n].length, a = 0, u = 0; t < e; t++) o = document.getElementById("s" + ttt.outcomes[n][t]), /X/.test(o.innerHTML) && a++, /O/.test(o.innerHTML) && u++;
            if (3 == a) {
                m = "X";
                break
            }
            if (3 == u) {
                m = "O";
                break
            }
        }
        return 9 == ttt.turnNum || m ? {
            winner: m || "Draw",
            state: "over"
        } : {
            state: "ongoing"
        }
    },
    cpuCalculate: function() {
        var t, e, n, o, m = {
            "outcome 1": [0, 0, 0],
            "outcome 2": [0, 0, 0],
            "outcome 3": [0, 0, 0],
            "outcome 4": [0, 0, 0],
            "outcome 5": [0, 0, 0],
            "outcome 6": [0, 0, 0],
            "outcome 7": [0, 0, 0],
            "outcome 8": [0, 0, 0]
        };
        for (n in ttt.outcomes) {
            for (t = 0, e = ttt.outcomes[n].length; t < e; t++) square = document.getElementById("s" + ttt.outcomes[n][t]), /X/.test(square.innerHTML) && (m[n][0]++, m[n][2]++), /O/.test(square.innerHTML) && (m[n][1]++, m[n][2]++);
            if ((2 == m[n][1] || 2 == m[n][0]) && m[n][2] < 3) {
                ttt.cpuMark(n), o = !0;
                break
            }
        }
        o || ttt.cpuMark("random")
    },
    cpuMark: function(t) {
        if ("random" == t) {
            var e = document.querySelectorAll(".square:not(.marked)");
            ttt.mark(e[Math.floor(Math.random() * e.length)])
        } else
            for (var n, o = 0, m = ttt.outcomes[t].length; o < m; o++)
                if (n = document.getElementById("s" + ttt.outcomes[t][o]), !/marked/.test(n.className)) {
                    ttt.mark(n);
                    break
                }
    }
};