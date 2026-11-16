/* Cloudflare Turnstile(ボット判定)のサイトキー。公開してよい値。
   空のままならボット判定は表示されず、サーバー側の確認も TURNSTILE_SECRET_KEY が未設定なら行わない。
   シークレットキーはここには書かず、Cloudflare Pages の環境変数 TURNSTILE_SECRET_KEY に設定する。 */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAGDLqQK4Op6kBgBk";
