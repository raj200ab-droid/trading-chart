# Flowstate — Bybit Market Analysis

A responsive educational market-analysis dashboard using Bybit public market data; no account, API key, or special network permission is needed. Spot pairs and USDT linear perpetual contracts use separate public market categories. The app screens the top 100 markets by liquidity, then checks the top 6 positive/negative 24h-momentum candidates with 15m/4h/1D technicals and displays only confirmed Strong Buy/Strong Sell results.

## Run / use on a phone

Open the HTTPS preview in a mobile browser and choose **Add to Home Screen / Install app** from the browser menu. For a native Android install, every push to GitHub runs the **Build Android APK** workflow. Open the repository's **Actions** tab, select the latest successful run, then download the `flowstate-android-debug-apk` artifact and install `app-debug.apk` on the phone (Android may ask you to allow installs from that browser/files app). The APK is a debug-signed sideload build, not a Play Store release. Bybit requests use the phone's current internet connection. The service worker caches the app shell for quicker reopening, not market data.

For local development:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

Local Android debug build (requires Node 22, JDK 21, Android SDK):

```sh
npm ci
npm run android:debug
```

GitHub Actions builds the same debug APK automatically on every pushed branch.

## Features

- Separate Strong Buy / Strong Sell shortlisted results from Bybit Spot/linear-perpetual markets; click a candidate for its MTF score, RSI checks, and illustrative entry/stop/target plan. Live WebSocket has reconnect and REST fallback.
- Signal strength with a plain-language explanation of 15m/4h/1D trends, RSI, volume vs 20-bar average, MACD histogram, ADX, nearest swing support/resistance, VWAP, RSI divergence, breakout/retest, EMA 200, order-book imbalance, ATR volatility filter, and ATR stop distance. Select a minimum number of confirmations; insufficient setups display WAIT / MIXED. Scalp mode sets fixed 0.75% stop and +1% / +2% take-profit targets.
- Futures-only funding-rate crowding and 15-minute open-interest change checks, using public Bybit endpoints.
- Account balance and risk-percent calculator for maximum loss, approximate coin quantity, and notional position size.
- Browser-local price and RSI crossing alerts; optional browser notifications. Price checks run once per minute while the page is open; RSI alerts refresh the selected market every five minutes.
- Watchlist, active alerts, timeframe/market selection, and risk/backtest settings persisted locally in the browser.
- Walk-forward train/test backtest with a fixed single-timeframe proxy of the live technical confirmations, regime (trend/range) breakdown, 1.5×/2× cost robustness checks, per-side fees/slippage, estimated futures funding, expectancy, losing streaks, and a marked equity curve.
- Paper-trade signal entries with stop/target monitoring, simulated P&L, a persistent on-device journal, and rolling 7-day P&L/win-rate/expectancy report; no real orders are placed.
- Backtest coverage/gap/duplicate checks and a low-out-of-sample-trade warning.

**Limitations:** Market signals are educational heuristics, not financial advice or guaranteed predictions. Scanner bias uses 24-hour price change; selected-market analysis uses a 20-candle mean, ATR-like range, Wilder RSI(14), MACD, ADX, candle-volume ratios, rolling VWAP, heuristic RSI divergence/breakout-retest, EMA 200, order-book depth snapshots, and recent swing levels, not LuxAlgo's proprietary SMC indicator. Order-book imbalance is transient/spoofable and only a weak input. Funding/open-interest endpoints may be unavailable or delayed; missing data is marked unavailable and is not treated as confirmation. Walk-forward backtests use a fixed-rule, selected-timeframe proxy (they do not optimize parameters or reproduce historical multi-timeframe/order-book/funding snapshots) on Bybit candle history capped by endpoint limits; fees/slippage/funding are assumptions and fills, liquidity, taxes, and execution constraints may differ. Price alerts only run while the page is open. No orders are placed. Not affiliated with TradingView or LuxAlgo.
