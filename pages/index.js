import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { useState }  from 'react';

export default function Home() {
  const [noEmojiInfo, setNoEmojiInfo] = useState(false);
  const [isLoadedEmoji, setIsLoadedEmoji] = useState(false);
  const [txtEmoji, setTxtEmoji ] = useState("");
  const [objEmoji, setObjEmoji] = useState({});

  async function handleForm(infoEvent) {
    infoEvent.preventDefault();
    setNoEmojiInfo(false);
    setIsLoadedEmoji(false);

    if (txtEmoji == "") {
      return false;
    }

    const str_emoji = txtEmoji; //infoEvent.target.value;

    console.log(str_emoji);

    if (str_emoji == "") {
      return;
    }

    const response = await fetch('api/emoji/' + str_emoji);

    if (response.status != 200) {
      setNoEmojiInfo(true);
      return false;
    }

    const obj_emoji = await response.json();
 

    setObjEmoji(obj_emoji);
    setIsLoadedEmoji(true);

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Dicionário de Emoji</title>
        <meta name="description" content="Dicionário de Emoji" />
        <meta charSet="utf-8" />
      </Head>

      <main className={styles.content}>
        <header>Dicionário de Emoji</header>
        <section>
          <p className={styles.instructions}>Digite o Emoji no formulário abaixo para descobrir seu significado</p>
        </section>
        <section>
          <form 
            action=""
            onSubmit={(eventInfo) => {handleForm(eventInfo)}}
            className={styles.form}
            acceptCharset="utf-8"
          >
            <input 
              type="text" 
              value={txtEmoji} 
              placeholder="Informe o Emoji" 
              name="txt_emoji"
              onChange={ (infoEvent) => {
                const txtEmoji = infoEvent.target.value[0];
                setTxtEmoji(txtEmoji);
              } }
            /><br />
            <button>Obter significado do Emoji</button>
            {noEmojiInfo && (<p>Emoji não encontrado!</p>)}
          </form>
          <section className={styles.emojiInfoContainer}>

          {isLoadedEmoji && (
            <>
              <p className={styles.emojiSymbol}>{objEmoji.emoji}</p>
              <p className={styles.emojiAlias}>{objEmoji.alias}</p>
              <footer>Para saber mais sobre o emoji, acesse: <a href="https://www.significados.com.br/emojis-emoticons/" target="_blank">https://www.significados.com.br/emojis-emoticons/</a></footer>
            </>
          )}

          </section>
        </section>
        <footer>
            <p>O conteúdo dessa página só foi possível graças ao trabalho de Adriano Padilha.</p>
        </footer>
      </main>

    </div>
  )
}
