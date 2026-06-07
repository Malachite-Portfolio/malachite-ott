export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: string;
  rating: string;
  duration: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  isTrending: boolean;
  isPopular: boolean;
  isNew: boolean;
  continueProgress?: number;
};

type SeedMovie = Pick<Movie, "title" | "genre" | "year" | "duration" | "rating">;

type TmdbAsset = {
  posterPath: string;
  backdropPath: string;
  description: string;
};

const tmdbImageBase = "https://image.tmdb.org/t/p";

export const fallbackPosterUrl =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80";

export const fallbackBackdropUrl =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1280&q=80";

const tmdbAssets: Record<string, TmdbAsset> = {
  "John Wick": {
    posterPath: "/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg",
    backdropPath: "/ff2ti5DkA9UYLzyqhQfI2kZqEuh.jpg",
    description: "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
  },
  "Mad Max: Fury Road": {
    posterPath: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    backdropPath: "/uT895WNwm0aIJRtGizcQhrejWUo.jpg",
    description: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
  },
  "Mission: Impossible - Fallout": {
    posterPath: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    backdropPath: "/5jnoAA74Qwb5w6B9FMvnc20n6Ie.jpg",
    description: "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
  },
  "The Dark Knight": {
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/cfT29Im5VDvjE0RpyKOSdCKZal7.jpg",
    description: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
  },
  "Gladiator": {
    posterPath: "/wN2xWp1eIwCKOD0BHTcErTBv1Uq.jpg",
    backdropPath: "/jhk6D8pim3yaByu1801kMoxXFaX.jpg",
    description: "After the death of Emperor Marcus Aurelius, his devious son takes power and demotes Maximus, one of Rome's most capable generals who Marcus preferred. Eventually, Maximus is forced to become a gladiator and battle to the death against other men for the amusement of paying audiences.",
  },
  "Top Gun: Maverick": {
    posterPath: "/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg",
    backdropPath: "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    description: "After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him, Pete \"Maverick\" Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
  },
  "Indiana Jones": {
    posterPath: "/ceG9VzoRAVGwivFU403Wc3AHRys.jpg",
    backdropPath: "/zPACwR32amTNvzId9qyapCWXYDJ.jpg",
    description: "Archaeologist Indiana Jones is hired to locate the legendary Ark of the Covenant and finds himself up against a dangerous enemy racing toward the same prize.",
  },
  "Jurassic Park": {
    posterPath: "/63viWuPfYQjRYLSZSZNq7dglJP5.jpg",
    backdropPath: "/o7LzVmlOSYc3EspyVMC9bsTTARc.jpg",
    description: "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.",
  },
  "Pirates of the Caribbean": {
    posterPath: "/kvDwL2gTf6yxujbsWbsGQB3Z9Wa.jpg",
    backdropPath: "/zXMGAtDqJ58P8G3W4bwKyYffPhn.jpg",
    description: "When wily pirate Captain Barbossa seizes Jack Sparrow's beloved ship, the Black Pearl, and kidnaps the governor's daughter, Elizabeth Swann, blacksmith Will Turner reluctantly teams up with the unpredictable pirate Jack to rescue her-only to uncover a terrifying curse that turns Barbossa's crew into the undead.",
  },
  "Jumanji": {
    posterPath: "/iWV47r6kFneCiApgrMII5HSkfHw.jpg",
    backdropPath: "/qSxeCfWUUyht9hZgaaYmtPtTkw2.jpg",
    description: "When siblings Judy and Peter discover an enchanted board game that opens the door to a magical world, they unwittingly invite Alan -- an adult who's been trapped inside the game for 26 years -- into their living room. Alan's only hope for freedom is to finish the game, which proves risky as all three find themselves running from giant rhinoceroses, evil monkeys and other terrifying creatures.",
  },
  "The Revenant": {
    posterPath: "/ji3ecJphATlVgWNY0B0RVXZizdf.jpg",
    backdropPath: "/mNQtUJv1F3u0uSKILFrGjIHqkxx.jpg",
    description: "In the 1820s, a frontiersman, Hugh Glass, sets out on a path of vengeance against those who left him for dead after a bear mauling.",
  },
  "King Kong": {
    posterPath: "/6a2HY6UmD7XiDD3NokgaBAXEsD2.jpg",
    backdropPath: "/mRM2NB0i3wv4HqxXvwIjEVi4Qqq.jpg",
    description: "In 1933 New York, an overly ambitious movie producer coerces his cast and hired ship crew to travel to mysterious Skull Island, where they encounter Kong, a giant ape who is immediately smitten with the leading lady.",
  },
  "Interstellar": {
    posterPath: "/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    backdropPath: "/2ssWTSVklAEc98frZUQhgtGHx7s.jpg",
    description: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
  },
  "Inception": {
    posterPath: "/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    backdropPath: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    description: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
  },
  "The Matrix": {
    posterPath: "/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg",
    backdropPath: "/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg",
    description: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
  },
  "Dune": {
    posterPath: "/gDzOcq0pfeCeqMBwKIJlSmQpjkZ.jpg",
    backdropPath: "/zRKQW58MBEY078AxkHxEJzUskCl.jpg",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
  },
  "Avatar": {
    posterPath: "/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg",
    backdropPath: "/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
    description: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
  },
  "Blade Runner 2049": {
    posterPath: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropPath: "/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg",
    description: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
  },
  "Gone Girl": {
    posterPath: "/ts996lKsxvjkO2yiYG0ht4qAicO.jpg",
    backdropPath: "/iWak7wT0j6ycCc8lKr4NBz9c7n5.jpg",
    description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
  },
  "Shutter Island": {
    posterPath: "/nrmXQ0zcZUL8jFLrakWc90IR8z9.jpg",
    backdropPath: "/rbZvGN1A1QyZuoKzhCw8QPmf2q0.jpg",
    description: "World War II soldier-turned-U.S. Marshal Teddy Daniels investigates the disappearance of a patient from a hospital for the criminally insane, but his efforts are compromised by troubling visions and a mysterious doctor.",
  },
  "Se7en": {
    posterPath: "/191nKfP0ehp3uIvWqgPbFmI4lv9.jpg",
    backdropPath: "/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg",
    description: "Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the \"seven deadly sins\" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Somerset researches each sin in an effort to get inside the killer's mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.",
  },
  "Prisoners": {
    posterPath: "/jsS3a3ep2KyBVmmiwaz3LvK49b1.jpg",
    backdropPath: "/n1ItmvzsDV5yLgDodSCLZpFlsP6.jpg",
    description: "Keller Dover is facing every parent's worst nightmare. His six-year-old daughter, Anna, is missing, together with her young friend, Joy, and as minutes turn to hours, panic sets in. The only lead is a dilapidated RV that had earlier been parked on their street.",
  },
  "Zodiac": {
    posterPath: "/6YmeO4pB7XTh8P8F960O1uA14JO.jpg",
    backdropPath: "/3zCPI4JFc54xvLaJ71oI2KoP3az.jpg",
    description: "Over the course of a decade, editors of the San Francisco Chronicle entice themselves in the murders of the Zodiac Killer. However, as time runs its course, interest in the case dwindles in the eyes of the professionals. The Killer stops interacting with the public. However, believing he has the answers, an amateur cartoonist from the initial sightings races against time to prevent what he believes is another murder.",
  },
  "The Girl with the Dragon Tattoo": {
    posterPath: "/8bokS83zGdhaXgN9tjidUKmAftW.jpg",
    backdropPath: "/dNFbrnF0mIBm0rClbfEFWTtsgMP.jpg",
    description: "Disgraced journalist Mikael Blomkvist investigates the disappearance of a weary patriarch's niece from 40 years ago. He is aided by the pierced, tattooed, punk computer hacker named Lisbeth Salander. As they work together in the investigation, Blomkvist and Salander uncover immense corruption beyond anything they have ever imagined.",
  },
  "The Conjuring": {
    posterPath: "/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    backdropPath: "/ecKQlAEG95k62SMGhvX83oEqANK.jpg",
    description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse. Forced to confront a powerful entity, the Warrens find themselves caught in the most terrifying case of their lives.",
  },
  "IT": {
    posterPath: "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
    backdropPath: "/qVGpxnjrGlHaSTCqTQI6viBDSfp.jpg",
    description: "In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.",
  },
  "A Quiet Place": {
    posterPath: "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    backdropPath: "/nHRUtBwFNnNN70vcQ7lAsjc2T6S.jpg",
    description: "A family is forced to live in silence while hiding from creatures that hunt by sound.",
  },
  "The Nun": {
    posterPath: "/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg",
    backdropPath: "/cMnVmutb5mVgIBeiMOncAbwNjvG.jpg",
    description: "A priest with a dark past and a novice nearing her final vows are sent by the Vatican to Romania to investigate a nun's death and face a demonic force.",
  },
  "Insidious": {
    posterPath: "/1egpmVXuXed58TH2UOnX1nATTrf.jpg",
    backdropPath: "/yZP6GyrgzdpjH1AxPHlb8ACLkiA.jpg",
    description: "A family discovers that dark spirits have invaded their home after their son inexplicably falls into an endless sleep. When they reach out to a professional for help, they learn things are a lot more personal than they thought.",
  },
  "Annabelle": {
    posterPath: "/yLsuU2P2SpDYFwtZQ7dtfVAf6TE.jpg",
    backdropPath: "/pWZ0srAfPx4XyJMlFkKBlmYfx3C.jpg",
    description: "A couple begins to experience terrifying supernatural occurrences involving a vintage doll shortly after their home is invaded by satanic cultists.",
  },
  "The Hangover": {
    posterPath: "/A0uS9rHR56FeBtpjVki16M5xxSW.jpg",
    backdropPath: "/iuRVt8tFiXDPGgzavhuSa3QHRxD.jpg",
    description: "When three friends finally come to after a raucous night of bachelor-party revelry, they find a baby in the closet and a tiger in the bathroom. But they can't seem to locate their best friend, Doug - who's supposed to be tying the knot. Launching a frantic search for Doug, the trio perseveres through a nasty hangover to try to make it to the church on time.",
  },
  "Home Alone": {
    posterPath: "/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
    backdropPath: "/ih2xVgeMS8R5WUetYE8Mr9hVTlB.jpg",
    description: "Eight-year-old Kevin McCallister makes the most of the situation after his family unwittingly leaves him behind when they go on Christmas vacation. When thieves try to break into his home, he puts up a fight like no other.",
  },
  "Jumanji: Welcome to the Jungle": {
    posterPath: "/pSgXKPU5h6U89ipF7HBYajvYt7j.jpg",
    backdropPath: "/rz3TAyd5kmiJmozp3GUbYeB5Kep.jpg",
    description: "Four teenagers in detention discover an old video game console with a game they've never heard of. When they decide to play, they are immediately sucked into the jungle world of Jumanji in the bodies of their avatars. They'll have to complete the adventure of their lives filled with fun, thrills and danger or be stuck in the game forever!",
  },
  "Deadpool": {
    posterPath: "/3E53WEZJqP6aM84D8CckXx4pIHw.jpg",
    backdropPath: "/en971MEXui9diirXlogOrPKmsEn.jpg",
    description: "The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
  },
  "The Mask": {
    posterPath: "/jPC2eYub74zwf2tPGVtzSlBW6Oy.jpg",
    backdropPath: "/bQlw59HncOXX9alFlOYKHAvSnm.jpg",
    description: "Timid bank clerk Stanley Ipkiss discovers a magical mask infused with the spirit of the Norse god Loki. Donning it transforms him into an unrestrained, green-faced, cartoon-like wild man. While the mask grants him the confidence to woo a local singer, it also makes him the target of a ruthless mobster.",
  },
  "Free Guy": {
    posterPath: "/dxraF0qPr1OEgJk17ltQTO84kQF.jpg",
    backdropPath: "/7py8kUCYaOdFn1TfVS87BDBySOz.jpg",
    description: "A bank teller discovers he is actually a background player in an open-world video game, and decides to become the hero of his own story. Now, in a world where there are no limits, he is determined to be the guy who saves his world his way before it's too late.",
  },
  "Titanic": {
    posterPath: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    backdropPath: "/xnHVX37XZEp33hhCbYlQFq7ux1J.jpg",
    description: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiance. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death-on its first and last voyage-on April 15, 1912.",
  },
  "La La Land": {
    posterPath: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    backdropPath: "/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg",
    description: "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
  },
  "The Notebook": {
    posterPath: "/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
    backdropPath: "/zdXnJqBaGFVtLoPNuMeKfEYUViZ.jpg",
    description: "An epic love story centered around an older man who reads aloud to a woman with Alzheimer's. From a faded notebook, the old man's words bring to life the story about a couple who is separated by World War II, and is then passionately reunited, seven years later, after they have taken different paths.",
  },
  "Me Before You": {
    posterPath: "/Ia3dzj5LnCj1ZBdlVeJrbKJQxG.jpg",
    backdropPath: "/3WK7p9EdZmmvB1IbB2Vw9Rf4lXH.jpg",
    description: "Lou Clark, a directionless 26-year-old from the English countryside, takes a job at the local castle as a caregiver and companion to a wealthy young banker, Will Traynor. Wheelchair-bound from an accident two years prior, the once adventurous Will has all but given up - that is until Lou determines to show him that life is worth living.",
  },
  "Crazy Rich Asians": {
    posterPath: "/1XxL4LJ5WHdrcYcihEZUCgNCpAW.jpg",
    backdropPath: "/7tTCnQcKzUkabDV3BJMe7LIzlEs.jpg",
    description: "An American-born Chinese economics professor accompanies her boyfriend to Singapore for his best friend's wedding, only to get thrust into the lives of Asia's rich and famous.",
  },
  "The Fault in Our Stars": {
    posterPath: "/kcVuktIlrn9SAN1uBmPDnocTQmF.jpg",
    backdropPath: "/oQaVV7p916HO5MDI820zzs1pin9.jpg",
    description: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a patient named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
  },
  "The Shawshank Redemption": {
    posterPath: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdropPath: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
    description: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
  },
  "Forrest Gump": {
    posterPath: "/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg",
    backdropPath: "/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg",
    description: "A man with a low IQ has accomplished great things in his life and been present during significant historic events-in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
  },
  "Oppenheimer": {
    posterPath: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropPath: "/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
  },
  "The Pursuit of Happyness": {
    posterPath: "/lBYOKAMcxIvuk9s9hMuecB9dPBV.jpg",
    backdropPath: "/5jhG1lTgV0MS6tDkBMQSSitttTT.jpg",
    description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
  },
  "The Social Network": {
    posterPath: "/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    backdropPath: "/1GlZNA9L5trst3ItgRiyQTUH1uf.jpg",
    description: "In 2003, Harvard undergrad and computer programmer Mark Zuckerberg begins work on a new concept that eventually turns into the global social network known as Facebook. Six years later, Mark is one of the youngest billionaires ever, but his unprecedented success leads to both personal and legal complications when he ends up on the receiving end of two lawsuits, one involving his former friend.",
  },
  "A Beautiful Mind": {
    posterPath: "/rEIg5yJdNOt9fmX4P8gU9LeNoTQ.jpg",
    backdropPath: "/vVBcIN68kFq681b4lObiNJhEVro.jpg",
    description: "From the heights of notoriety to the depths of depravity, John Forbes Nash Jr. experiences it all. As a brilliant but socially awkward mathematician, he made a groundbreaking discovery early in his career and stands on the brink of international acclaim. But as the handsome and arrogant Nash accepts secret work in cryptography, he becomes entangled in a mysterious conspiracy. His life takes a nightmarish turn and he soon finds himself on a painful and harrowing journey of self-discovery.",
  },
  "Harry Potter": {
    posterPath: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    backdropPath: "/1XAC6RPT01UX9EQGy2JVn5c8pgy.jpg",
    description: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard with a place waiting for him at Hogwarts School of Witchcraft and Wizardry.",
  },
  "The Lord of the Rings": {
    posterPath: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    backdropPath: "/oiwc338EoBgS4sEI2ixAny4KQKg.jpg",
    description: "Young hobbit Frodo Baggins must leave home to keep a mysterious ring from falling into the hands of its evil creator. A fellowship forms to protect him on the journey to Mount Doom.",
  },
  "Fantastic Beasts": {
    posterPath: "/fLsaFKExQt05yqjoAvKsmOMYvJR.jpg",
    backdropPath: "/8Qsr8pvDL3s1jNZQ4HK1d1Xlvnh.jpg",
    description: "In 1926, Newt Scamander arrives at the Magical Congress of the United States of America with a magically expanded briefcase, which houses a number of dangerous creatures and their habitats. When the creatures escape from the briefcase, it sends the American wizarding authorities after Newt, and threatens to strain even further the state of magical and non-magical relations.",
  },
  "The Hobbit": {
    posterPath: "/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg",
    backdropPath: "/xyXmtuvsoM5J3yNad0nvcetpBdY.jpg",
    description: "Bilbo Baggins, a hobbit enjoying his quiet life, is swept into an epic quest by Gandalf the Grey and thirteen dwarves who seek to reclaim their mountain home from Smaug, the dragon.",
  },
  "Maleficent": {
    posterPath: "/bDG3yei6AJlEAK3A5wN7RwFXQ7V.jpg",
    backdropPath: "/bNiiUCQUD7ij5Ybh2GoWSZwqAb1.jpg",
    description: "A beautiful, pure-hearted young woman, Maleficent has an idyllic life growing up in a peaceable forest kingdom, until one day when an invading army threatens the harmony of the land. She rises to be the land's fiercest protector, but she ultimately suffers a ruthless betrayal - an act that begins to turn her heart into stone. Bent on revenge, Maleficent faces an epic battle with the invading King's successor and, as a result, places a curse upon his newborn infant Aurora. As the child grows, Maleficent realizes that Aurora holds the key to peace in the kingdom - and to Maleficent's true happiness as well.",
  },
  "Narnia": {
    posterPath: "/iREd0rNCjYdf5Ar0vfaW32yrkm.jpg",
    backdropPath: "/tuDhEdza074bA497bO9WFEPs6O6.jpg",
    description: "Siblings Lucy, Edmund, Susan and Peter step through a magical wardrobe and find the land of Narnia. There, they discover a charming, once peaceful kingdom that has been plunged into eternal winter by the evil White Witch, Jadis. Aided by the wise and magnificent lion, Aslan, the children lead Narnia into a spectacular, climactic battle to be free of the Witch's glacial powers forever.",
  },
  "Toy Story": {
    posterPath: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    backdropPath: "/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg",
    description: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
  },
  "Frozen": {
    posterPath: "/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
    backdropPath: "/rj58WQ9ImI0mYDptXdM7euX1Wjt.jpg",
    description: "Young princess Anna of Arendelle dreams about finding true love at her sister Elsa's coronation. Fate takes her on a dangerous journey in an attempt to end the eternal winter that has fallen over the kingdom. She's accompanied by ice delivery man Kristoff, his reindeer Sven, and snowman Olaf. On an adventure where she will find out what friendship, courage, family, and true love really means.",
  },
  "The Lion King": {
    posterPath: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    backdropPath: "/q00H8EqULYSK74lgevMkhmGGLHn.jpg",
    description: "Young lion prince Simba, eager to one day become king of the Pride Lands, grows up under the watchful eye of his father Mufasa; all the while his villainous uncle Scar conspires to take the throne for himself. Amid betrayal and tragedy, Simba must confront his past and find his rightful place in the Circle of Life.",
  },
  "Finding Nemo": {
    posterPath: "/5lc6nQc0VhWFYFbNv016xze8Jvy.jpg",
    backdropPath: "/eCynaAOgYYiw5yN5lBwz3IxqvaW.jpg",
    description: "Nemo, an adventurous young clownfish, is unexpectedly taken from his Great Barrier Reef home to a dentist's office aquarium. It's up to his worrisome father Marlin and a friendly but forgetful fish Dory to bring Nemo home -- meeting vegetarian sharks, surfer dude turtles, hypnotic jellyfish, hungry seagulls, and more along the way.",
  },
  "Kung Fu Panda": {
    posterPath: "/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
    backdropPath: "/qdthf9WrRDSaIkGVQGhhJ9pz1hn.jpg",
    description: "Chosen by prophecy but doubted by all, Po is an unlikely choice for the mystical title of the Dragon Warrior-a clumsy panda thrust into the world of kung fu as a deadly enemy threatens the Valley of Peace. Under reluctant guidance by Master Shifu and the Furious Five, Po must embrace who he is to unlock the power that no scroll can teach.",
  },
  "Inside Out": {
    posterPath: "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    backdropPath: "/o3i6AfTcWAuNvzAUV3q5lOmi6Gx.jpg",
    description: "When 11-year-old Riley moves to a new city, her Emotions team up to help her through the transition. Joy, Fear, Anger, Disgust and Sadness work together, but when Joy and Sadness get lost, they must journey through unfamiliar places to get back home.",
  },
  "The Godfather": {
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropPath: "/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg",
    description: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
  },
  "Scarface": {
    posterPath: "/iQ5ztdjvteGeboxtmRdXEChJOHh.jpg",
    backdropPath: "/1qM2BYNE11Viby8ImC9LC00DgDr.jpg",
    description: "After getting a green card in exchange for assassinating a Cuban government official, Tony Montana stakes a claim on the drug trade in Miami. Viciously murdering anyone who stands in his way, Tony eventually becomes the biggest drug lord in the state, controlling nearly all the cocaine that comes through Miami. But increased pressure from the police, wars with Colombian drug cartels and his own drug-fueled paranoia serve to fuel the flames of his eventual downfall.",
  },
  "Goodfellas": {
    posterPath: "/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg",
    backdropPath: "/gILte6Zd7m1YneIr6MVhh30S9pr.jpg",
    description: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
  },
  "The Irishman": {
    posterPath: "/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg",
    backdropPath: "/1RDto0tLo8Fhq7OcwgDaM7nECb7.jpg",
    description: "Pennsylvania, 1956. Frank Sheeran, a war veteran of Irish origin who works as a truck driver, accidentally meets mobster Russell Bufalino. Once Frank becomes his trusted man, Bufalino sends him to Chicago with the task of helping Jimmy Hoffa, a powerful union leader related to organized crime, with whom Frank will maintain a close friendship for nearly twenty years.",
  },
  "The Departed": {
    posterPath: "/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
    backdropPath: "/6WRrGYalXXveItfpnipYdayFkQB.jpg",
    description: "To take down South Boston's Irish Mafia, the police send in one of their own to infiltrate the underworld, not realizing the syndicate has done likewise. While an undercover cop curries favor with the mob kingpin, a career criminal rises through the police ranks. But both sides soon discover there's a mole among them.",
  },
  "Joker": {
    posterPath: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdropPath: "/hO7KbdvGOtDdeg0W4Y5nKEHeDDh.jpg",
    description: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
  },
  "Avengers: Endgame": {
    posterPath: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    backdropPath: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
  },
  "Spider-Man: No Way Home": {
    posterPath: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropPath: "/tyQo080tijexyUHBvWPwQt26bZa.jpg",
    description: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
  },
  "Black Panther": {
    posterPath: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    backdropPath: "/19Ed4XgjahPm4U8JT7SnntERIlt.jpg",
    description: "King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without. Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantle to join with ex-girlfriend Nakia, the queen-mother, his princess-kid sister, members of the Dora Milaje (the Wakandan 'special forces') and an American secret agent, to prevent Wakanda from being dragged into a world war.",
  },
  "Iron Man": {
    posterPath: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    backdropPath: "/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg",
    description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
  },
  "Batman Begins": {
    posterPath: "/sPX89Td70IDDjVr85jdSBb4rWGr.jpg",
    backdropPath: "/9IIBboV7MCT0bTxzXHmWK1Hq558.jpg",
    description: "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City. Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
  },
  "Wonder Woman": {
    posterPath: "/v4ncgZjG2Zu8ZW5al1vIZTsSjqX.jpg",
    backdropPath: "/AaABt75ZzfMGrscUR2seabz4PEX.jpg",
    description: "An Amazon princess comes to the world of Man in the grips of the First World War to confront the forces of evil and bring an end to human conflict.",
  },
  "1917": {
    posterPath: "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
    backdropPath: "/2lBOQK06tltt8SQaswgb8d657Mv.jpg",
    description: "At the height of the First World War, two young British soldiers must cross enemy territory and deliver a message that will stop a deadly attack on hundreds of soldiers.",
  },
  "Saving Private Ryan": {
    posterPath: "/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
    backdropPath: "/bdD39MpSVhKjxarTxLSfX6baoMP.jpg",
    description: "As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines. Ranger captain John Miller and seven men are tasked with penetrating German-held territory and bringing the boy home.",
  },
  "Dunkirk": {
    posterPath: "/b4Oe15CGLL61Ped0RAS9JpqdmCt.jpg",
    backdropPath: "/ddIkmH3TpR6XSc47jj0BrGK5Rbz.jpg",
    description: "The story of the miraculous evacuation of Allied soldiers from Belgium, Britain, Canada and France, who were cut off and surrounded by the German army from the beaches and harbour of Dunkirk between May 26th and June 4th 1940 during World War II.",
  },
  "Hacksaw Ridge": {
    posterPath: "/fnOMP6mjmOmZwmlC1n0K7ivrzt1.jpg",
    backdropPath: "/vDKRMZGFTKP9nQolzeSB1rB1w6p.jpg",
    description: "WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.",
  },
  "Fury": {
    posterPath: "/pfte7wdMobMF4CVHuOxyu6oqeeA.jpg",
    backdropPath: "/95ckrV6wQgbffurAVmETQ5YKASL.jpg",
    description: "April, 1945. As the Allies make their final push in the European Theatre, a battle-hardened army sergeant named Wardaddy commands a Sherman tank and her five-man crew on a deadly mission behind enemy lines. Outnumbered and outgunned, and with a rookie soldier thrust into their platoon, Wardaddy and his men face overwhelming odds in their heroic attempts to strike at the heart of Nazi Germany.",
  },
  "American Sniper": {
    posterPath: "/vJgtfUmZE5i4L12sOryAPuBa04K.jpg",
    backdropPath: "/mfq6XYwSVDTdZu4qeJ7HYPu7KmA.jpg",
    description: "U.S. Navy SEAL Chris Kyle takes his sole mission-protect his comrades-to heart and becomes one of the most lethal snipers in American history. His pinpoint accuracy not only saves countless lives but also makes him a prime target of insurgents. Despite grave danger and his struggle to be a good husband and father to his family back in the States, Kyle serves four tours of duty in Iraq. However, when he finally returns home, he finds that he cannot leave the war behind.",
  },
  "Knives Out": {
    posterPath: "/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    backdropPath: "/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg",
    description: "When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate. From Harlan's dysfunctional family to his devoted staff, Blanc sifts through a web of red herrings and self-serving lies to uncover the truth behind Harlan's untimely death.",
  },
  "Murder on the Orient Express": {
    posterPath: "/7GtdJU6iAg6fjQu3E3zta3bIAQh.jpg",
    backdropPath: "/IQyEvPTYvrzsa7qstRj6VLQupr.jpg",
    description: "Genius Belgian detective Hercule Poirot investigates the murder of an American tycoon aboard the Orient Express train.",
  },
  "Sherlock Holmes": {
    posterPath: "/momkKuWburNTqKBF6ez7rvhYVhE.jpg",
    backdropPath: "/85g84VtSf9tu1A9JqqruXEHspb7.jpg",
    description: "Eccentric consulting detective Sherlock Holmes and Doctor John Watson battle to bring down a new nemesis and unravel a deadly plot that could destroy England.",
  },
  "The Da Vinci Code": {
    posterPath: "/9ejKfNk0LBhSI9AahH4f9NJNZNM.jpg",
    backdropPath: "/vlnSG1EQi0ez2A6MkFfjovPfkES.jpg",
    description: "A murder in Paris' Louvre Museum and cryptic clues in some of Leonardo da Vinci's most famous paintings lead to the discovery of a religious mystery. For 2,000 years a secret society closely guards information that - should it come to light - could rock the very foundations of Christianity.",
  },
  "Enola Holmes": {
    posterPath: "/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",
    backdropPath: "/kMe4TKMDNXTKptQPAdOF0oZHq3V.jpg",
    description: "While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.",
  },
  "The Prestige": {
    posterPath: "/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg",
    backdropPath: "/z3br1ub7spqGMkxgjgJSdM4DC21.jpg",
    description: "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.",
  },
  "The Greatest Showman": {
    posterPath: "/b9CeobiihCx1uG1tpw8hXmpi7nm.jpg",
    backdropPath: "/lrNKm3HNvGdZoAfiBKu7b04FLHN.jpg",
    description: "The story of American showman P.T. Barnum, founder of the circus that became the famous traveling Ringling Bros. and Barnum & Bailey Circus.",
  },
  "Mamma Mia!": {
    posterPath: "/zdUA4FNHbXPadzVOJiU0Rgn6cHR.jpg",
    backdropPath: "/8IGO8rF5asa7tnO0aEtx3e5R4Z5.jpg",
    description: "A spirited young bride-to-be living with her single mother on a small Greek island secretly invites three of her mother's ex-boyfriends in hope of finding her biological father to walk her down the aisle.",
  },
  "A Star Is Born": {
    posterPath: "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
    backdropPath: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg",
    description: "Seasoned musician Jackson Maine discovers - and falls in love with - struggling artist Ally. She has just about given up on her dream to make it big as a singer - until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
  },
  "Moulin Rouge!": {
    posterPath: "/2kjM5CUZRIU5yOANUowrbJcRL9L.jpg",
    backdropPath: "/vvcLSgiviCIU0J0UcwLqWdU8Iup.jpg",
    description: "A celebration of love and creative inspiration takes place in the infamous, gaudy and glamorous Parisian nightclub, at the cusp of the 20th century. A young poet, who is plunged into the heady world of Moulin Rouge, begins a passionate affair with the club's most notorious and beautiful star.",
  },
  "West Side Story": {
    posterPath: "/yfz3IUoYYSY32tkb97HlUBGFsnh.jpg",
    backdropPath: "/exnFsbb9c3fDutTsgtJSWcDmZm0.jpg",
    description: "Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.",
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function tmdbPoster(path?: string) {
  return path ? tmdbImageBase + "/w500" + path : fallbackPosterUrl;
}

function tmdbBackdrop(path?: string) {
  return path ? tmdbImageBase + "/w1280" + path : fallbackBackdropUrl;
}

function trailerFor(title: string) {
  return "https://www.youtube.com/embed?listType=search&list=" + encodeURIComponent(title + " official trailer");
}

function buildMovies(seed: SeedMovie[]): Movie[] {
  return seed.map((movie, index) => {
    const asset = tmdbAssets[movie.title];

    return {
      ...movie,
      id: slugify(movie.genre + "-" + movie.title),
      description:
        asset?.description ||
        "Watch " + movie.title + ", a premium " + movie.genre.toLowerCase() + " pick on Malachite Play.",
      posterUrl: tmdbPoster(asset?.posterPath),
      backdropUrl: tmdbBackdrop(asset?.backdropPath),
      trailerUrl: trailerFor(movie.title),
      isTrending: index % 7 === 0 || index % 11 === 0,
      isPopular: index % 5 === 1 || index % 9 === 0,
      isNew: index % 8 === 2 || index > seed.length - 10,
      continueProgress: index >= 12 && index <= 17 ? [22, 38, 54, 67, 75, 88][index - 12] : undefined,
    };
  });
}

const seedMovies: SeedMovie[] = [
  { title: "John Wick", genre: "Action", year: "2014", duration: "1h 41m", rating: "R" },
  { title: "Mad Max: Fury Road", genre: "Action", year: "2015", duration: "2h", rating: "R" },
  { title: "Mission: Impossible - Fallout", genre: "Action", year: "2018", duration: "2h 27m", rating: "PG-13" },
  { title: "The Dark Knight", genre: "Action", year: "2008", duration: "2h 32m", rating: "PG-13" },
  { title: "Gladiator", genre: "Action", year: "2000", duration: "2h 35m", rating: "R" },
  { title: "Top Gun: Maverick", genre: "Action", year: "2022", duration: "2h 10m", rating: "PG-13" },
  { title: "Indiana Jones", genre: "Adventure", year: "1981", duration: "1h 55m", rating: "PG" },
  { title: "Jurassic Park", genre: "Adventure", year: "1993", duration: "2h 7m", rating: "PG-13" },
  { title: "Pirates of the Caribbean", genre: "Adventure", year: "2003", duration: "2h 23m", rating: "PG-13" },
  { title: "Jumanji", genre: "Adventure", year: "1995", duration: "1h 44m", rating: "PG" },
  { title: "The Revenant", genre: "Adventure", year: "2015", duration: "2h 36m", rating: "R" },
  { title: "King Kong", genre: "Adventure", year: "2005", duration: "3h 7m", rating: "PG-13" },
  { title: "Interstellar", genre: "Sci-Fi", year: "2014", duration: "2h 49m", rating: "PG-13" },
  { title: "Inception", genre: "Sci-Fi", year: "2010", duration: "2h 28m", rating: "PG-13" },
  { title: "The Matrix", genre: "Sci-Fi", year: "1999", duration: "2h 16m", rating: "R" },
  { title: "Dune", genre: "Sci-Fi", year: "2021", duration: "2h 35m", rating: "PG-13" },
  { title: "Avatar", genre: "Sci-Fi", year: "2009", duration: "2h 42m", rating: "PG-13" },
  { title: "Blade Runner 2049", genre: "Sci-Fi", year: "2017", duration: "2h 44m", rating: "R" },
  { title: "Gone Girl", genre: "Thriller", year: "2014", duration: "2h 29m", rating: "R" },
  { title: "Shutter Island", genre: "Thriller", year: "2010", duration: "2h 18m", rating: "R" },
  { title: "Se7en", genre: "Thriller", year: "1995", duration: "2h 7m", rating: "R" },
  { title: "Prisoners", genre: "Thriller", year: "2013", duration: "2h 33m", rating: "R" },
  { title: "Zodiac", genre: "Thriller", year: "2007", duration: "2h 37m", rating: "R" },
  { title: "The Girl with the Dragon Tattoo", genre: "Thriller", year: "2011", duration: "2h 38m", rating: "R" },
  { title: "The Conjuring", genre: "Horror", year: "2013", duration: "1h 52m", rating: "R" },
  { title: "IT", genre: "Horror", year: "2017", duration: "2h 15m", rating: "R" },
  { title: "A Quiet Place", genre: "Horror", year: "2018", duration: "1h 30m", rating: "PG-13" },
  { title: "The Nun", genre: "Horror", year: "2018", duration: "1h 36m", rating: "R" },
  { title: "Insidious", genre: "Horror", year: "2010", duration: "1h 43m", rating: "PG-13" },
  { title: "Annabelle", genre: "Horror", year: "2014", duration: "1h 39m", rating: "R" },
  { title: "The Hangover", genre: "Comedy", year: "2009", duration: "1h 40m", rating: "R" },
  { title: "Home Alone", genre: "Comedy", year: "1990", duration: "1h 43m", rating: "PG" },
  { title: "Jumanji: Welcome to the Jungle", genre: "Comedy", year: "2017", duration: "1h 59m", rating: "PG-13" },
  { title: "Deadpool", genre: "Comedy", year: "2016", duration: "1h 48m", rating: "R" },
  { title: "The Mask", genre: "Comedy", year: "1994", duration: "1h 41m", rating: "PG-13" },
  { title: "Free Guy", genre: "Comedy", year: "2021", duration: "1h 55m", rating: "PG-13" },
  { title: "Titanic", genre: "Romance", year: "1997", duration: "3h 14m", rating: "PG-13" },
  { title: "La La Land", genre: "Romance", year: "2016", duration: "2h 8m", rating: "PG-13" },
  { title: "The Notebook", genre: "Romance", year: "2004", duration: "2h 3m", rating: "PG-13" },
  { title: "Me Before You", genre: "Romance", year: "2016", duration: "1h 50m", rating: "PG-13" },
  { title: "Crazy Rich Asians", genre: "Romance", year: "2018", duration: "2h", rating: "PG-13" },
  { title: "The Fault in Our Stars", genre: "Romance", year: "2014", duration: "2h 6m", rating: "PG-13" },
  { title: "The Shawshank Redemption", genre: "Drama", year: "1994", duration: "2h 22m", rating: "R" },
  { title: "Forrest Gump", genre: "Drama", year: "1994", duration: "2h 22m", rating: "PG-13" },
  { title: "Oppenheimer", genre: "Drama", year: "2023", duration: "3h", rating: "R" },
  { title: "The Pursuit of Happyness", genre: "Drama", year: "2006", duration: "1h 57m", rating: "PG-13" },
  { title: "The Social Network", genre: "Drama", year: "2010", duration: "2h", rating: "PG-13" },
  { title: "A Beautiful Mind", genre: "Drama", year: "2001", duration: "2h 15m", rating: "PG-13" },
  { title: "Harry Potter", genre: "Fantasy", year: "2001", duration: "2h 32m", rating: "PG" },
  { title: "The Lord of the Rings", genre: "Fantasy", year: "2001", duration: "2h 58m", rating: "PG-13" },
  { title: "Fantastic Beasts", genre: "Fantasy", year: "2016", duration: "2h 12m", rating: "PG-13" },
  { title: "The Hobbit", genre: "Fantasy", year: "2012", duration: "2h 49m", rating: "PG-13" },
  { title: "Maleficent", genre: "Fantasy", year: "2014", duration: "1h 37m", rating: "PG" },
  { title: "Narnia", genre: "Fantasy", year: "2005", duration: "2h 23m", rating: "PG" },
  { title: "Toy Story", genre: "Animation / Family", year: "1995", duration: "1h 21m", rating: "G" },
  { title: "Frozen", genre: "Animation / Family", year: "2013", duration: "1h 42m", rating: "PG" },
  { title: "The Lion King", genre: "Animation / Family", year: "1994", duration: "1h 28m", rating: "G" },
  { title: "Finding Nemo", genre: "Animation / Family", year: "2003", duration: "1h 40m", rating: "G" },
  { title: "Kung Fu Panda", genre: "Animation / Family", year: "2008", duration: "1h 32m", rating: "PG" },
  { title: "Inside Out", genre: "Animation / Family", year: "2015", duration: "1h 35m", rating: "PG" },
  { title: "The Godfather", genre: "Crime / Mafia", year: "1972", duration: "2h 55m", rating: "R" },
  { title: "Scarface", genre: "Crime / Mafia", year: "1983", duration: "2h 50m", rating: "R" },
  { title: "Goodfellas", genre: "Crime / Mafia", year: "1990", duration: "2h 26m", rating: "R" },
  { title: "The Irishman", genre: "Crime / Mafia", year: "2019", duration: "3h 29m", rating: "R" },
  { title: "The Departed", genre: "Crime / Mafia", year: "2006", duration: "2h 31m", rating: "R" },
  { title: "Joker", genre: "Crime / Mafia", year: "2019", duration: "2h 2m", rating: "R" },
  { title: "Avengers: Endgame", genre: "Superhero", year: "2019", duration: "3h 1m", rating: "PG-13" },
  { title: "Spider-Man: No Way Home", genre: "Superhero", year: "2021", duration: "2h 28m", rating: "PG-13" },
  { title: "Black Panther", genre: "Superhero", year: "2018", duration: "2h 14m", rating: "PG-13" },
  { title: "Iron Man", genre: "Superhero", year: "2008", duration: "2h 6m", rating: "PG-13" },
  { title: "Batman Begins", genre: "Superhero", year: "2005", duration: "2h 20m", rating: "PG-13" },
  { title: "Wonder Woman", genre: "Superhero", year: "2017", duration: "2h 21m", rating: "PG-13" },
  { title: "1917", genre: "War", year: "2019", duration: "1h 59m", rating: "R" },
  { title: "Saving Private Ryan", genre: "War", year: "1998", duration: "2h 49m", rating: "R" },
  { title: "Dunkirk", genre: "War", year: "2017", duration: "1h 46m", rating: "PG-13" },
  { title: "Hacksaw Ridge", genre: "War", year: "2016", duration: "2h 19m", rating: "R" },
  { title: "Fury", genre: "War", year: "2014", duration: "2h 14m", rating: "R" },
  { title: "American Sniper", genre: "War", year: "2014", duration: "2h 13m", rating: "R" },
  { title: "Knives Out", genre: "Mystery", year: "2019", duration: "2h 10m", rating: "PG-13" },
  { title: "Murder on the Orient Express", genre: "Mystery", year: "2017", duration: "1h 54m", rating: "PG-13" },
  { title: "Sherlock Holmes", genre: "Mystery", year: "2009", duration: "2h 8m", rating: "PG-13" },
  { title: "The Da Vinci Code", genre: "Mystery", year: "2006", duration: "2h 29m", rating: "PG-13" },
  { title: "Enola Holmes", genre: "Mystery", year: "2020", duration: "2h 3m", rating: "PG-13" },
  { title: "The Prestige", genre: "Mystery", year: "2006", duration: "2h 10m", rating: "PG-13" },
  { title: "La La Land", genre: "Musical", year: "2016", duration: "2h 8m", rating: "PG-13" },
  { title: "The Greatest Showman", genre: "Musical", year: "2017", duration: "1h 45m", rating: "PG" },
  { title: "Mamma Mia!", genre: "Musical", year: "2008", duration: "1h 48m", rating: "PG-13" },
  { title: "A Star Is Born", genre: "Musical", year: "2018", duration: "2h 16m", rating: "R" },
  { title: "Moulin Rouge!", genre: "Musical", year: "2001", duration: "2h 7m", rating: "PG-13" },
  { title: "West Side Story", genre: "Musical", year: "2021", duration: "2h 36m", rating: "PG-13" },
];

export const movies = buildMovies(seedMovies);

export const genres = Array.from(new Set(movies.map((movie) => movie.genre)));

export const genreRows = genres.map((genre) => ({
  title: genre,
  movies: movies.filter((movie) => movie.genre === genre),
}));

export const trendingNow = movies.filter((movie) => movie.isTrending).slice(0, 14);
export const hollywoodBlockbusters = movies.filter((movie) => movie.isPopular).slice(0, 14);
export const hollywoodTrailers = movies.filter((_, index) => index % 6 === 2).slice(0, 14);
export const newReleases = movies.filter((movie) => movie.isNew).slice(0, 14);
export const recommendedMovies = movies.filter((_, index) => index % 5 === 1).slice(0, 14);
export const continueWatchingDefaults = movies.filter((movie) => typeof movie.continueProgress === "number");
