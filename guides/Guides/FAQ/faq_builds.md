---
title: 'Build et mécaniques'
outline: [2, 3]
description: 'Réponses aux questions très fréquentes: Build et mécaniques'
order: 4
---

## FAQ : Build et mécaniques

[[toc]]

### "Quelles stats je dois viser pour XXX ?"

::: details Pas de réponse courte pour celle ci :

De manière générale, actuellement **on sous-estime collectivement la stamina requise pour le Team Trials** (en même temps c'est difficile d'avoir assez de stam et assez du reste des stats actuellement, et ça nous oblige à faire des sacrifices). Quasiment tout le monde (moi inclus), sauf ceux qui se sont rendu compte d'à quel point [on sous-estime les quantités de stamina désirées](https://docs.google.com/document/d/11X2P7pLuh-k9E7PhRiD20nDX22rNWtCpC1S4IMx_8pQ/preview?tab=t.0#heading=h.5gejlihfmr29). Pour sécuriser toutes les courses en Team Trials, **soyez généreux·ses sur la stamina**. Je n'ai pas fait ces simulations moi même, mais on dit que pour assurer toutes les courses il faut :

- 500 stamina effective en Sprint
- 800 stamina effective en Mile
- 1100 stamina effective en Medium
- 1300+ stamina effective en Long

À noter que "stamina effective" c'est la combinaison de votre stamina + vos skills de recovery. Pour un ordre de grandeur très vague, vous pouvez considérer qu'une gold recovery c'est +200 stamina (+50 pour une white recovery). En dessous de ces valeurs, vous êtes à risque de perdre des courses par manque de stamina. À l'inverse, **[vous gagnerez souvent contre les adversaires qui ont trop peu de stamina](https://docs.google.com/document/d/11X2P7pLuh-k9E7PhRiD20nDX22rNWtCpC1S4IMx_8pQ/preview?tab=t.0#heading=h.77y3enp6ghei)**. Même en Sprint et en Mile.

En Sprint et en Mile la stamina requise baisse notablement avec des grandes valeurs de guts (en JP on fait Sprint et Mile avec presque uniquement du guts, mais c'est parce qu'on a 1/ des bonnes cartes guts 2/ d'autres usage de guts que les HP). Genre. 900+ guts.

Pendant une carrière, il y a assez peu de repères notables à atteindre, alors n'hésiez pas à établir les votres. Par exemple, on peut dire que si vous avez moins de 2000 stats totales au début de la senior year c'est que vos stats montent moins vite que d'habitude (exmple complètement au pif). Vous pouvez prendre ce type de repères.

Les seuls seuils que je vous invite à essayer de "viser" :

- Vous allez parfois perdre **Kikka Sho** en carrière (Classic Year, fin Octobre) si vous avez moins de **350-400 stamina** effective.
- Vous allez presque systématiquement perdre **Tenno Sho Haru** en carrière (Senior Year, fin Avril) si vous avez moins de **600 stamina** effective. Si vous gagnez cette course, vous avez la stamina pour l'entièreté de la carrière (mais pas forcément pour Team Trials).
- Visez au moins **600 speed et 450 stamina pour sécuriser Arima Kinen** en fin de carrière (Senior Year, fin Décembre). Vos autres stats doivent suivre, bien entendu. Vous perdrez si vous avez genre 200 power, 150 guts et 200 wits à côté.

Pour le reste, essayez de visualiser vos propres repères de croissance de stats.

::: warning Rappel

Pendant une carrière toutes vos stats sont secrètement boostées de 400. Ce n'est pas parce que vous pouvez finir une course de carrière donnée que vous pouvez finir la même course en Team Trials ou en PvP compétitif.

:::

### "À quoi ça sert guts ?"

::: details Guts réduit votre consommation de HP :

Pour le moment, guts n'a qu'un seul rôle : **réduire votre consommation de HP** (et non pas continuer à courir quand vous n'avez plus de HP, ce sont 2 choses très différentes !). C'est tout. Pour le moment, guts est strictement un substitu à la stamina, et est de plus en plus mauvais à ce rôle, à mesure que sa valeur augmente (sous-entendu, +50 guts produtit une plus grande réduction de consommation de HP quand vous avez 300 guts que quand vous avez 800 guts).

Plus tard dans le jeu, d'autres mécaniques de course utiliseront guts, ce qui la rendra un peu plus intéressante, mais toujours peu prioritaire. Sauf pour les Front Runner, qui en auront -plus tard- un vrai usage. Pour toutes les autres stratégies, Guts est surtout une stat "bonus" ; ne pas en avoir n'invalidera jamais une build, mais une _grande abondance_ de guts est parfois un atout solide quand 2 uma sont de qualité similaires.

Vous pouvez faire les carrières des uma sprint/mile **avec des cartes guts plutôt que power ou stamina**, c'est valide. Ce n'est juste pas recommandé pour le moment.

:::

### "À quoi ça sert wits ?"

::: details Wits fait plein de petites choses qui rendent votre uma plus fiable et régulière en course :

De manière générale, **wits rend votre uma plus régulière**, et réduit les chances d'être sévèrement puni par une mauvaise RNG.

Dans toutes les courses, pendant les **premiers 41%** de la course, **la vitesse de votre uma dépend principalement de wits.** En effet, pendant les premiers 41% de la course votre uma participe à une mécanique bizarre et contre intuitive, appelée **Position Keep**. Pendant Position Keep, votre uma fait une succession de lancers de dés, pour décider si elle court plus vite, moins vite, ou conserve sa vitesse. Ces dice rolls sont influencés par wits, et réussissent plus souvent avec une valeur de wits élevée.

Cela dit, même au delà de Position Keep, wits est un facteur déterminant de votre vitesse dans toute la course. En effet, 24 fois par course votre uma va roll wits pour décider d'augmenter ou pas sa vitesse.

Wits influe aussi sur :

- **l'activation des skills.** Si ça vous amuse, voici la visualisation de la [probabilité d'activation de skills en fonction de la valeur de wits](https://www.wolframalpha.com/input/?i=y+%3D+100+-+9000%2Fx%2C+x+from+200+to+1200).
- la **probabilité d'être "rushed"** pendant une course. Voici une visualisation de la [probabilité d'être rushed pendant une course, en fonction de la valeur de wits](https://www.wolframalpha.com/input?i=y+%3D+%286.5+%2F+log10%280.1*x%2B1%29%29%5E2%2C+x+from+200+to+1200)
- la probabilité d'**économiser des HP et augmenter sa vitesse** pendant une descente.

|                                                    | 400 wits | 600 wits | 800 wits | 1000 wits | 1200 wits |
| -------------------------------------------------- | -------- | -------- | -------- | --------- | --------- |
| Probabilité d'activer un skill (%)                 | 77.5     | 85       | 88.75    | 91        | 92.5      |
| Probabilité d'être rushed (%)                      | 16.25    | 13.25    | 11.5     | 10.5      | 9.75      |
| Probabilité d'avoir un speed boost en descente (%) | 16       | 24       | 32       | 40        | 44        |

C'est pour toutes les petites choses que wits accomplis qu'on dit que cette stat rend votre uma plus régulière. Plus tard dans le jeu, d'autres mécaniques de courses utiliseront wits.

:::

### "Je prends quoi comme skills ?"

:::: details Les skills de vitesse qui s'activent pour votre uma, et les recovery si besoin :

::: tip Gardez ce tableau sous le coude !

Voici [un gros doc vous proposant des très bonnes recommandations](https://docs.google.com/spreadsheets/d/1oB3eTvKqREtJDWJL0q80O_VjBcpOmRl5xE0z5fZKgFY/htmlview) pour **tous les skills du jeu**, présents au 31 juillet 2025 ! Vous pourrez aussi y voir une explication des conditions réelles d'activation.

:::

C'est rarement une mauvaise idée de prendre les skills de vitesse qui s'activent pour votre uma. Si vous ne savez pas comment choisir vos skills (c'est normal, c'est un gros sujet, et une des choses à quoi on reconnait un·e joueur·euse expérimenté·e), contentez vous de ça. **Les skills de vitesse qui s'activent pour votre uma**. Si vous avez la possibilité de prendre des **skills gold** (qui s'activent pour votre uma), prenez les en priorité (sauf si au prix d'un gold vous pouvez avoir 4 whites).

Pour savoir si un skill s'active, le plus important à vérifier c'est s'il y a une **contrainte d'aptitude**. Si oui, votre uma doit courir avec l'aptitude correspondante. Ainsi, un skill Pace Chaser (exemple : Prepared to Pass) ne s'activera jamais si votre uma utilise la stratégie Front Runner pour la course (même si votre uma a une bonne aptitude Front Runner). Les skills qui n'ont **aucune contraine d'aptitude** (exemple : Straightaway Adept) **sont universels** (la plupart du temps), et s'activent pour toutes les aptitudes. Attention, les skills uniques obtenus par inspiration n'ont pas de contrainte d'aptitude, mais ont souvent une **condition d'activation** qui complique l'activation pour certaines stratégies (exemple : presque impossible pour une Front Runner d'activer l'unique de Symboli Rudolf, qui requiert 3 dépassements).

Si votre uma est prévue pour le Team Trials **en medium ou en long**, vous allez très certainement avoir besoin de recovery, donc n'hésitez pas à en inclure (gold de préférence, mais les whites qui s'activent sont OK en Team Trials). **Évitez les skills greens** qui ne sont pas liés à une **aptitude** de votre uma (exemple : Sunny Days), sauf si vous n'avez pas beaucoup de skill points restants (ou si vous aimez le gambling), car vous n'avez **aucune certitude qu'ils s'activeront en Team Trials**. Vous pouvez prendre des debuffs s'il vous reste quelques skills points, ou si ça vous amuse, mais en Team Trials un debuff n'accomplira virtuellement rien dans la vaste majorité des cas.

Pour plus de détails sur le choix des skills, vous pouvez jeter un oeil à [ce guide](https://yamakyu.notion.site/Comment-bien-choisir-ses-skills-15fb1daa914b80d79dbbcd867ef1f245) (qui sera mis à jour en temps et en heure) afin d'en savoir plus sur la logique (qui est finalement assez simple, mais très nuancée) sur le choix des skills.

**Ne prenez pas de skill qui ne s'active pas**, SAUF si vous n'avez littéralement absolument plus rien d'autre à acheter. Auquel cas, essayez de cibler les skills qui correspondent à une **aptitude "A" de votre uma**, même si votre uma ne court pas avec cette aptitude.

::::

### "J'ai l'impression que mes skills ne s'activent pas ?"

::: details Voici les principales pistes à investiguer :

- Ne vous fiez pas seulement à la descripton du skill, **beaucoup de skills** (et en particulier les uniques) **décrivent très mal leur fonctionnement**. Pour savoir précisément comment ils s'activent, [cherchez le skill sur gametora.com](https://gametora.com/umamusume/skills), et inspectez les **conditions d'activation précises** en cliquant sur "More" ou "Details". Si vous avez besoin d'aide pour comprendre les conditions d'activation d'un skill, cliquez sur "show conditions in the viewer" pour obtenir des explications. Alternativement, vous pouvez consulter [ce guide](https://www.notion.so/umafrwiki/Comprendre-le-fonctionnement-des-skills-17d5f5610f1d80b3b297cd1ab77769f3).
- Certains skills (surtout les uniques, mais pas que) ont des conditions de position, et **ne s'activeront pas si votre uma est trop en avant ou trop en arrière**. Parfois, ces conditions sont un peu contre intuitives (surtout les uniques, encore une fois).
- Gardez en tête la proabilité d'activation des skills. Par exemple, 77.5% (400 wits) c'est vraiment très peu, ça veut dire que un quart de vos skills ne s'activent pas.

Aux dernières nouvelles, il n'y a pas de bug connu qui empêche l'activation des skills.

:::

### "Est-ce que mes propres debuffs peuvent affecter ma uma et ses coéquipières ?"

::: details Non, mais :

Il est possible que l'effet visuel du debuff touche quand même une de vos uma. Sur la version JP, ça a été un bug connu (j'ignore s'il a été résolu depuis), et peut être que nous l'avons aussi. Même si l'effet visuel s'applique sur votre uma ou une de ses coéquipières, les skills de debuff n'ont pas d'effet sur elles. Uniquement sur vos adversaires.

:::

### "Pourquoi j'ai un spark guts ★ en fin de carrière, alors que j'ai 1200 speed et 1200 stamina ?" {#inspiration_sparks}

::: details Je vous la donne dans le mille, c'est aléatoire.

Il y aura un guide détaillé sur le système d'inspiration (a lot to unpack), mais en attendant, voici l'essentiel à savoir sur l'obtention des sparks :

- On peut avoir un spark **bleu** de n'importe quelle **stat**, aléatoirement, et chaque stat pour laquelle vous avez **au moins 600** peut donner un spark ★★★. La chance est augmentée si la stat vaut 1100+.
- On peut avoir un spark **rose** de n'importe quelle aptitude pour laquelle la uma est notée "A" ou "S". Le choix est aléatoire parmi ces aptitudes, et la valeur du spark est toujours aléatoire entre ★ et ★★★ (même si vous perdez la run au premier objectif).
- Le spark **vert** donne une version affaiblie du **skill unique** de la uma legacy, mais seulement si la uma est 3⭐. Les uma 1 et 2⭐ ne peuvent pas avoir de spark vert.
- On peut aléatoirement obtenir des sparks **white** de n'importe quel skill acheté pendant ou à la fin de la carrière. Les skills **gold ou double-cerclés ◎** ont une chance plus élevé de produire un spark white de la version white du skill, et d'avoir beaucoup d'★ sur ce spark. Il n'existe pas de spark pour obtenir un skill gold.
- On peut aléatoirement obtenir des sparks **white** de n'importe quelle course gagnée pendant la carrière. En cas d'activation du spark, ça donnera un skill lié à la course, ou des stats.
- On peut aléatoirement obtenir un spark **white** lié au scénario, qui donne des stats (pour le spark "URA Finals", c'est speed et stamina)
- La qualité des sparks obtenus augmente pas mal si le rank de la uma après la carrière SS ou mieux !
- **Optimisation importante :** à la fin d'une carrière, une uma aura bien plus de chances d'obtenir un spark **white** donné si **une des legacy utilisées avait ce spark**. Si on fait une carrière avec une uma A, en utilisant une legacy X, qui a ses propres sous legacy (grand parents) Y et Z, il y a plus de chances de générer les sparks whites identiques aux spark de la legacy X et ses sous-legacy Y et Z. Donc si la legacy X (ou Y, ou Z) avait le spark "URA Finale", la uma A aura une plus grande chance d'obtenir le spark white URA Finale à la fin de sa carrière aussi.

TL;DR : c'est aléatoire, parce que évidemment.

:::

### "Quelle legacy choisir ? Est-ce qu'il vaut mieux privilégier certains sparks ?"

::: details Ça dépend beaucoup de ce que vous voulez faire :

- Privilégier les sparks de stas aidera à soutenir la croissance des stats en Q°. Ça aidera à **atteindre des valeurs élevées** avec peu de cartes support, ou à monter une stat pour laquelle vous avez **peu, ou pas de cartes support**. Par exemple, avoir une legacy avec beaucoup de ★ en wits est un bon bail si vous avez une seule carte wits dans votre deck. Overall, ça contribuera à augmenter le rank de votre uma. Si c'est ce qui vous arrange, favorisez les sparks bleus de stats.

- Si vous voulez faire du **PvP non compétitif** (Team Trials), les sparks white de skills sont un bon facteur à prendre en compte, car Team Trials est une compétition de points, et on obtient des points en activant des skills. N'ignorez pas pour autant une legacy qui a des gros sparks bleus, sous prétexte qu'elle n'a pas de white. C'est juste un **facteur supplémentaire** à prendre en compte dans vos choix.

- Si vous faites du **PvP compétitif** (Champion's Meeting et League of Heroes, pas encore dispo sur la version globale), l'aptitude "S" en distance est toujours **fortement prioritaire**, donc votre choix de legacy doit absolument avoir beaucoup de ★ sur les sparks roses de cette distance.

- Si vous faites une run pour farmer des meilleurs sparks, alors choisissez des legacy qui ont déjà beaucoup de sparks. Ca vous permet d'augmenter les chances d'avoir davantage de sparks à la fin de votre carrière. Faire des carrières avec des legacy qui ont de plus en plus de sparks c'est ce qui vous permettra plus tard d'avoir des legacy banger avec 5000 sparks. Autant que raisonnablement possible, faites des carrière avec des legacy de qualité ; ça augmentera d'une part la qualité des run, et d'autre part ça te permettra de brasser les sparks et en obtenir davantage pour vous (ta nouvelle legacy aura les sparks de la legacy d'origine, en tant que sous legacy/grand parent).

Très important : pendant les inspiration events, **les sparks d'une des 2 legacy principales ont 2 fois plus de chances de s'activer** que les sparks des sous legacy. Donc quand vous cherchez une bonne legacy, s'il y a des sparks white ou pink dont vous avez particulièrement besoin, c'est bien d'essayer de les avoir sur une legacy, et non pas une sous legacy.

"Et la compatibilité alors ?"

C'est contre-intuitif, car le jeu l'affiche mal, mais ce qui importe c'est surtout **l'affinité individuelle** entre (sous) legacy et votre uma. Pour connaître l'affinité entre votre uma et la legacy que vous utilisez, y'a pas de secrets : il faut aller sur [Gametora.com](https://gametora.com/umamusume/compatibility), sélectionner un "Main Char", et cliquer sur "Recommend". On est au début du jeu, nos options sont limités, **ne soyez pas trop exigeant·e·s sur l'affinité des legacy**. Pour le moment, on a pas d'accès facile à un moteur de recherche précis et sélectif pour trouver des legacy qui nous intéresse (sur la JP, il y avait [l'excellent Uma-pureDB](https://uma.pure-db.com/) pour ça), donc il y a une limite à à quel point on peut être exigeant.

Vous pouvez décider que vous n'avez pas la patience de faire 400 runs pour obtenir un résultat qui vous satisfait, auquel cas une **affinité élevée réduira le nombre de runs requis**, et accélèrera le processus. Mais si vous avez la patience de refaire des carrières jusqu'à avoir ce que vous désirez (une bonne build de PvP, un rank élevé, des nouveau sparks intéressants, whatever else), vous pouvez accepter d'utiliser des legacy d'affinité moindre, si ça vous permet d'en choisir une de qualité supérieure.

Les legacy c'est beaucoup une histoire **compromis**.

::: tip pro tip

En attendant une solution de recherche précise (comme uma-pureDB pour la version JP), n'hésitez pas à chercher sur les différents discord ([le notre](https://discord.gg/cheval), le [Discord Umamusume officiel](https://discord.gg/vrP8gXZS3A), le [Discord Umamusume international non-officiel](https://discord.gg/FRBk5KrYB3)) des legacies qui vous intéressent. Les quelques minutes de recherche en valent généralement la chandelle.

:::

### "Quels skills gold débloquer sur mes uma ?"

:::: details D'abord, les skills de votre fav. Ensuite, les skills qui s'activent et qui accomplissent quelque chose :

Toutes les uma ne sont pas conçues pareil, et le kit de certaines est particulièrement mauvais. C'est l'inconvénient d'être une uma du début du jeu : leurs kits sont souvent, euh, pas fous. Mais n'hésitez pas à débloquer les skills de votre uma fav si ça vous dit, même s'il s'agit de Matikanefukukitaru.

::: tip J'adore Matikanefukukitaru hein

Elle a juste, genre, certainement le pire kit de tout le jeu sadly. Son alt est bien meilleur, et j'ai hâte.

:::

Pour des choix de skills pertinents, vous voulez débloquer les skills gold **qui s'activent**. C'est vraiment **LE PLUS IMPORTANT**. L'activation.

Un skill qui "s'active" c'est un skill dont les **conditions d'activation** sont suffisamment **fiables/simples** pour être validées presque à coup sur **au moins une fois par course**, _la plupart du temps_. Occasionnellement ce sera pas validable et c'est pas dramatique ; ça devient gênant si _la plupart du temps_ le skill ne s'active pas.

::: warning Nuance importante : on ignore le wits check là

Un "skill qui s'active" reste un "skill qui s'active", même si vous avez 150 wits et que du coup le skill n'est pas déclenché dans une course réelle. Tout ce qui importe, c'est que si vous faites genre 100 courses, il faut que genre dans 90 d'entres elles les conditions aient été validées au moins une fois (et après la RNG décide du wits check).

:::

Vous voulez des skills qui s'activent, car Team Trials est une compétition de points, et **activer des skills ça donne des points**. Si la description vous semble complexe ou peu probable, il est possible que le skill s'active mal, et vous n'en voulez donc peut-être pas. Le mieux c'est toujours de regarder la [condition exacte sur Gametora.com](https://gametora.com/umamusume/skills), mais les conditions sont parfois compliquées à lire. N'hésitez pas non plus à [inspecter ce tableau vous proposant des bons skills à prendre](https://docs.google.com/spreadsheets/d/1oB3eTvKqREtJDWJL0q80O_VjBcpOmRl5xE0z5fZKgFY/htmlview).

Le MIEUX, cela dit, c'est de prendre des skills qui **s'activent** ET qui **accomplissent quelque chose** qui aide votre uma à gagner.

"Accomplir quelque chose" ça **élimine** déjà tous les skills gold de **déplacement latéral**, de **vision** (buff et debuff), ainsi que la plupart des skills gold d'**accélération**. Il y a des bons skills d'accel dans le jeu, mais pour le moment la plupart sont trop aléatoires dans leur **timing** pour accomplir quoi que ce soit, _la plupart du temps_. Donc si vous ne savez pas évaluer l'utilité d'un skill d'accel, partez du principe qu'il ne fait rien, la plupart du temps.

Les skills gold qui sont les meilleurs à accomplir quelque chose sont essentiellement :

- Concentration
- Les gold recovery (qui s'activent)
- Les skills de vitesse (qui s'activent)
- Les debuffs de vitesse
- Les debuffs de stamina

Si votre uma a une combinaison de ces types de skills gold là, c'est top. Ainsi, les uma comme Special Week, TM Opera O, Tôkai Teio alt, Taiki Shuttle ou Daiwa Scarlet (et d'autres) sont plutôt des no-brainer, et **vous pouvez débloquer tous leurs skills gold sans problème**.

Pour les autres, c'est du cas par cas. Et gardez en tête que c'est OK de débloquer des skills même si c'est pas parfaitement optimal.

::::
