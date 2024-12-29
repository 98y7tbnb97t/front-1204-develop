import armFlagImg from "../assets/flags/am.png"
import rusFlagImg from "../assets/flags/ru.png"
import engFlagImg from "../assets/flags/en.png"
import fraFlagImg from "../assets/flags/fra.png"
import gerFlagImg from "../assets/flags/ger.png"

type Country = {
    slug: string,
    text: string,
    img: string,
}

export const groupCountries: Country[] = [
    {
        slug: 'rus',
        text: 'Россия',
        img: rusFlagImg
    },
    {
        slug: 'arm',
        text: 'Հայաստան',
        img: armFlagImg
    },
    {
        slug: 'eng',
        text: 'England',
        img: engFlagImg
    },
    {
        slug: 'fra',
        text: 'France',
        img: fraFlagImg
    },
    {
        slug: 'ger',
        text: 'Deutschland',
        img: gerFlagImg
    }
]