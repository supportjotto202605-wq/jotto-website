import Link from "next/link";
import type { CSSProperties } from "react";

/* お問い合わせフォーム(入力 → 確認 → 完了)。動きと送信は engineLower.js */
export default function ContactBody() {
  return (
<section className="blk lt" data-th="l"><i className="an" data-a="" style={{"left": "calc(var(--px) * .5)", "top": "150px"} as CSSProperties}></i>
<div className="shd io"><i className="nb pp">{"05"}</i>
<b className="up">{"Contact form"}</b>
<span className="up">{"お問い合わせフォーム"}</span>
</div>
<div className="fw" data-step="1"><div className="io"><h2 className="jh up" style={{"marginBottom": "22px", "fontSize": "clamp(24px,2.9vw,44px)"} as CSSProperties}>{"お気軽に"}<br />
{"ご相談ください。"}</h2>
<p className="bd up" style={{"--d": ".1s", "margin": "0"} as CSSProperties}>{"内容を確認のうえ、担当者よりメールでご連絡します。送信後、受付確認の自動返信メールをお送りします。"}</p>
<ol className="stps up" style={{"--d": ".2s"} as CSSProperties} aria-label="お問い合わせの手順"><li className="stp"><i>{"01"}</i>
{"入力"}<span>{"Input"}</span>
</li>
<li className="stp"><i>{"02"}</i>
{"確認"}<span>{"Confirm"}</span>
</li>
<li className="stp"><i>{"03"}</i>
{"完了"}<span>{"Complete"}</span>
</li>
</ol>
</div>
<div className="fm io"><div className="up"><div data-v="1"><div className="fr"><p className="lb" style={{"marginTop": "0"} as CSSProperties}>{"お問い合わせの種類"}<em>{"必須"}</em>
</p>
<div className="seg"><button type="button" data-act="kind" data-k="partner">{"パートナー企業募集"}</button>
<button type="button" data-act="kind" data-k="apply">{"応募する"}</button>
<button type="button" className="on" data-act="kind" data-k="general">{"一般問い合わせ"}</button>
</div>
</div>
<div className="fr" data-for="partner general"><p className="lb">{"ご相談の事業"}<em className="op2">{"任意"}</em>
</p>
<div className="chips"><button type="button" data-act="chip" data-s="real-estate-consulting">{"不動産コンサル"}</button>
<button type="button" data-act="chip" data-s="outsourcing">{"アウトソーシング"}</button>
<button type="button" data-act="chip" data-s="product-development">{"プロダクト開発"}</button>
<button type="button" data-act="chip">{"その他"}</button>
</div>
</div>
<div className="fr" data-fr="company" data-for="partner"><label className="lb" htmlFor="f-company">{"企業名"}<em>{"必須"}</em>
</label>
<input className="ip" id="f-company" type="text" autoComplete="organization" placeholder="例）株式会社サンプル" data-req="" />
</div>
<div className="fr2"><div className="fr" data-fr="name"><label className="lb" htmlFor="f-name">{"お名前"}<em>{"必須"}</em>
</label>
<input className="ip" id="f-name" type="text" autoComplete="name" placeholder="例）山田 太郎" data-req="" />
</div>
<div className="fr" data-fr="kana" data-for="apply"><label className="lb" htmlFor="f-kana">{"フリガナ"}<em>{"必須"}</em>
</label>
<input className="ip" id="f-kana" type="text" placeholder="例）ヤマダ タロウ" data-req="" />
</div>
</div>
<div className="fr2"><div className="fr" data-fr="email"><label className="lb" htmlFor="f-email">{"メールアドレス"}<em>{"必須"}</em>
</label>
<input className="ip" id="f-email" type="email" autoComplete="email" placeholder="例）info@example.com" data-req="" />
</div>
<div className="fr" data-fr="tel"><label className="lb" htmlFor="f-tel">{"電話番号"}<em className="op2">{"任意"}</em>
</label>
<input className="ip" id="f-tel" type="tel" autoComplete="tel" placeholder="例）03-0000-0000" />
</div>
</div>
<div className="fr" data-fr="pos" data-for="apply"><label className="lb" htmlFor="f-pos">{"希望職種"}<em>{"必須"}</em>
</label>
<select className="ip" id="f-pos" data-req=""><option value="">{"選択してください"}</option>
<option>{"事業開発プロジェクトマネージャー"}</option>
<option>{"エンジニア（Web/アプリ開発）"}</option>
<option>{"携帯販売スタッフ"}</option>
</select>
</div>
<div className="fr" data-fr="msg"><label className="lb" htmlFor="f-msg">{"お問い合わせ内容"}<em>{"必須"}</em>
</label>
<textarea className="ip" id="f-msg" placeholder="ご相談内容をご記入ください" data-req=""></textarea>
</div>
<div className="fr" data-fr="agree"><label className="cs"><input type="checkbox" id="f-agree" />
<span>{"「"}<Link href="/contact/privacy" target="_blank">{"お問い合わせにおける個人情報の取り扱いについて"}</Link>
{"」を確認し、同意します。"}</span>
</label>
</div>
<p className="em" data-em="" hidden role="alert">{"未入力の項目があります。赤く表示された項目をご確認ください。"}</p>
<div className="sb"><button className="btn" type="button" data-act="confirm">{"入力内容を確認する"}<i><svg aria-hidden="true"><use href="#arwu"></use>
</svg>
</i>
</button>
</div>
</div>
<div data-v="2" hidden><h3>{"入力内容のご確認"}</h3>
<dl className="cf" data-cf=""></dl>
<p className="em" data-em2="" hidden role="alert" style={{"marginTop": "18px"} as CSSProperties}>{"送信に失敗しました。時間をおいて再度お試しください。"}</p>
<div className="sb"><button className="btn gh" type="button" data-act="back">{"修正する"}</button>
<button className="btn" type="button" data-act="send">{"この内容で送信する"}<i><svg aria-hidden="true"><use href="#arwu"></use>
</svg>
</i>
</button>
</div>
</div>
<div data-v="3" hidden><div className="dn"><span className="dn-i"><svg viewBox="0 0 32 32" aria-hidden="true"><use href="#jbugw"></use>
</svg>
</span>
<h3>{"お問い合わせを受け付けました。"}</h3>
<p>{"ご入力いただいたメールアドレス宛に、受付確認のメールをお送りしました。内容を確認のうえ、担当者よりご連絡いたします。"}</p>
<a className="btn" href="#top">{"ページの先頭へ"}<i><svg aria-hidden="true"><use href="#arwu"></use>
</svg>
</i>
</a>
</div>
</div>
</div>
</div>
</div>
<i className="an" data-a="" style={{"left": "calc(var(--px) * .5)", "bottom": "70px"} as CSSProperties}></i>
</section>
  );
}
