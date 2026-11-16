import Link from "next/link";
import type { CSSProperties } from "react";
import { plans } from "@/data/webPlans";
import { TURNSTILE_SITE_KEY } from "./config";

const Req = () => <em>必須</em>;
const Opt = () => <em className="op2">任意</em>;
const ArwI = () => (
  <i>
    <svg aria-hidden="true">
      <use href="#arwu" />
    </svg>
  </i>
);

/* ホームページ制作のヒアリングシート(入力 → 確認 → 完了)。動きと送信は engineLower.js */
export default function WebOrderBody() {
  return (
    <section className="blk lt" data-th="l" id="apply">
      <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" } as CSSProperties} />
      <div className="shd io">
        <i className="nb pp">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <use href="#jbugw" />
          </svg>
        </i>
        <b className="up">Hearing sheet</b>
        <span className="up">ヒアリングシート</span>
      </div>
      <div className="fw" data-step="1" data-form="web" data-k0="standard" data-kl="ご希望のプラン" data-cl="追加オプション">
        <div className="io">
          <h2 className="jh up" style={{ marginBottom: "22px", fontSize: "clamp(24px,2.9vw,44px)" } as CSSProperties}>
            このシートが、
            <br />
            打ち合わせの代わり。
          </h2>
          <p className="bd up" style={{ "--d": ".1s", margin: "0" } as CSSProperties}>
            ご記入いただいた内容をもとに制作します。わかる範囲で、できるだけ具体的にお書きください。送信後、金額と納期をメールでご連絡します。この時点では料金は発生しません。
          </p>
          <ol className="stps up" style={{ "--d": ".2s" } as CSSProperties} aria-label="お申し込みの手順">
            <li className="stp">
              <i>01</i>入力<span>Input</span>
            </li>
            <li className="stp">
              <i>02</i>確認<span>Confirm</span>
            </li>
            <li className="stp">
              <i>03</i>完了<span>Complete</span>
            </li>
          </ol>
        </div>
        <div className="fm io">
          <div className="up">
            <div data-v="1">
              <div className="hp" aria-hidden="true">
                <label>
                  この欄は入力しないでください
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" data-hp="" />
                </label>
              </div>
              <div className="fr">
                <p className="lb" style={{ marginTop: "0" } as CSSProperties}>
                  ご希望のプラン
                  <Req />
                </p>
                <div className="seg">
                  {plans.map((p) => (
                    <button key={p.key} type="button" data-act="kind" data-k={p.key}>
                      {p.name}（{p.price}万円）
                    </button>
                  ))}
                  <button type="button" data-act="kind" data-k="unsure">
                    相談して決めたい
                  </button>
                </div>
              </div>
              <div className="fr">
                <p className="lb">
                  追加オプション
                  <Opt />
                </p>
                <div className="chips">
                  {["ロゴ制作", "文章の作成", "ページの追加", "ドメインの取得・設定", "メールアドレスの開設", "動きの演出", "特急対応"].map((c) => (
                    <button key={c} type="button" data-act="chip">
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="fr2">
                <div className="fr" data-fr="company">
                  <label className="lb" htmlFor="w-company">
                    会社名・屋号
                    <Req />
                  </label>
                  <input className="ip" id="w-company" type="text" autoComplete="organization" placeholder="例）株式会社サンプル" data-req="" />
                </div>
                <div className="fr" data-fr="name">
                  <label className="lb" htmlFor="w-name">
                    お名前
                    <Req />
                  </label>
                  <input className="ip" id="w-name" type="text" autoComplete="name" placeholder="例）山田 太郎" data-req="" />
                </div>
              </div>
              <div className="fr" data-fr="email">
                <label className="lb" htmlFor="w-email">
                  メールアドレス
                  <Req />
                </label>
                <input className="ip" id="w-email" type="email" autoComplete="email" placeholder="例）info@example.com" data-req="" />
              </div>
              <div className="fr" data-fr="biz">
                <label className="lb" htmlFor="w-biz">
                  事業の内容
                  <Req />
                </label>
                <textarea className="ip sm" id="w-biz" placeholder="例）豊島区で美容室を1店舗運営。30〜40代の女性のお客さまが中心です。" data-req="" />
              </div>
              <div className="fr2">
                <div className="fr" data-fr="goal">
                  <label className="lb" htmlFor="w-goal">
                    ホームページの目的
                    <Req />
                  </label>
                  <select className="ip" id="w-goal" data-req="">
                    <option value="">選択してください</option>
                    <option>問い合わせ・予約を増やしたい</option>
                    <option>名刺代わりに会社・お店を紹介したい</option>
                    <option>採用の応募を増やしたい</option>
                    <option>今あるサイトを作り直したい</option>
                    <option>その他</option>
                  </select>
                </div>
                <div className="fr" data-fr="mat">
                  <label className="lb" htmlFor="w-mat">
                    素材のご用意
                    <Req />
                  </label>
                  <select className="ip" id="w-mat" data-req="">
                    <option value="">選択してください</option>
                    <option>ロゴ・写真・文章をすべて用意できる</option>
                    <option>一部だけ用意できる</option>
                    <option>これから用意する</option>
                  </select>
                </div>
              </div>
              <div className="fr" data-fr="pages">
                <label className="lb" htmlFor="w-pages">
                  載せたいページと内容
                  <Req />
                </label>
                <textarea className="ip" id="w-pages" placeholder={"例）\n・トップ：お店の紹介と写真\n・メニュー：料金表\n・アクセス：住所と営業時間\n・お問い合わせ：フォーム"} data-req="" />
              </div>
              <div className="fr" data-fr="ref">
                <label className="lb" htmlFor="w-ref">
                  参考にしたいサイト
                  <Opt />
                </label>
                <textarea className="ip sm" id="w-ref" placeholder="URLと、気に入っている点をお書きください（3つまで）" />
              </div>
              <div className="fr" data-fr="tone">
                <label className="lb" htmlFor="w-tone">
                  希望する雰囲気・色
                  <Opt />
                </label>
                <input className="ip" id="w-tone" type="text" placeholder="例）白と緑を基調に、落ち着いた雰囲気で" />
              </div>
              <div className="fr2">
                <div className="fr" data-fr="dom">
                  <label className="lb" htmlFor="w-dom">
                    ドメイン
                    <Req />
                  </label>
                  <select className="ip" id="w-dom" data-req="">
                    <option value="">選択してください</option>
                    <option>すでに持っている</option>
                    <option>新しく取得したい</option>
                    <option>わからない</option>
                  </select>
                </div>
                <div className="fr" data-fr="due">
                  <label className="lb" htmlFor="w-due">
                    公開の希望時期
                    <Opt />
                  </label>
                  <input className="ip" id="w-due" type="text" placeholder="例）来年1月末まで" />
                </div>
              </div>
              <div className="fr" data-fr="msg">
                <label className="lb" htmlFor="w-msg">
                  その他のご要望
                  <Opt />
                </label>
                <textarea className="ip sm" id="w-msg" placeholder="ご質問や、伝えておきたいことがあればお書きください" />
              </div>
              <div className="fr" data-fr="agree">
                <label className="cs">
                  <input type="checkbox" id="w-agree" />
                  <span>
                    「<a href="#terms">ご依頼にあたっての決まり</a>」と「
                    <Link href="/contact/privacy" target="_blank">
                      個人情報の取り扱いについて
                    </Link>
                    」を確認し、同意します。
                  </span>
                </label>
              </div>
              <p className="em" data-em="" hidden role="alert">
                未入力の項目があります。赤く表示された項目をご確認ください。
              </p>
              <div className="sb">
                <button className="btn" type="button" data-act="confirm">
                  入力内容を確認する
                  <ArwI />
                </button>
              </div>
            </div>
            <div data-v="2" hidden>
              <h3>入力内容のご確認</h3>
              <dl className="cf" data-cf="" />
              <div className="ts" data-ts="" data-ts-key={TURNSTILE_SITE_KEY} />
              <p className="em" data-em3="" hidden role="alert" style={{ marginTop: "18px" } as CSSProperties}>
                ボット判定の確認が終わっていません。チェックが完了してから、もう一度送信してください。表示されない場合は info@jotto.co.jp までご連絡ください。
              </p>
              <p className="em" data-em2="" hidden role="alert" style={{ marginTop: "18px" } as CSSProperties}>
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
              <div className="sb">
                <button className="btn gh" type="button" data-act="back">
                  修正する
                </button>
                <button className="btn" type="button" data-act="send">
                  この内容で送信する
                  <ArwI />
                </button>
              </div>
            </div>
            <div data-v="3" hidden>
              <div className="dn">
                <span className="dn-i">
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <use href="#jbugw" />
                  </svg>
                </span>
                <h3>お申し込みを受け付けました。</h3>
                <p>ご入力いただいたメールアドレス宛に、受付確認のメールをお送りしました。内容を確認のうえ、金額と納期を制作担当よりご連絡します（受付時間：平日10:00〜18:00）。</p>
                <a className="btn" href="#top">
                  ページの先頭へ
                  <ArwI />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", bottom: "70px" } as CSSProperties} />
    </section>
  );
}
