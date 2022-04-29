import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Emojis.module.css';

import { useState }  from 'react';
import { useEffect } from 'react';

export default function Emojis() {

    let arr_emojis = [];

    const [listEmojis, setListEmojis] = useState([]);
    const [noEmojis, setNoEmojis] = useState(false);

    async function getAllEmojis() {
        const response = await fetch('api/emojis/');

        if (response.status != 200) {
            return ;
        }

        const obj_emoji = await response.json();
       
        setListEmojis(obj_emoji.data);
        setNoEmojis(obj_emoji.data.length == 0);

    }

    useEffect(() => {
        getAllEmojis();
    }, []);


    return (
        <div className={styles.container}>
            <Head>
                <title>Dicionário de Emoji</title>
                <meta name="description" content="Dicionário de Emoji" />
                <meta charSet="utf-8" />
            </Head>

            <main className={styles.content}>
                <header>Lista com emojis</header>
                <section className={styles.listEmojis}>
                    {
                        noEmojis ? (<p>Falha na obtenção da lista de emojis</p>)
                        : (<ul> {
                                    listEmojis.map(element => {
                                        return (
                                            <li key={element.id}>
                                                <span>{element.emoji}</span>
                                                <span>{element.alias}</span>
                                            </li>
                                        )
                                    })
                                }
                        </ul>)
                    }
                </section>
                <footer>
                    <p>O conteúdo dessa página só foi possível graças ao trabalho de Adriano Padilha.</p>
                    <p><a href="https://www.significados.com.br/emojis-emoticons/" target="_blank">https://www.significados.com.br/emojis-emoticons/</a></p>
                </footer>
            </main>
        </div>
    );
}