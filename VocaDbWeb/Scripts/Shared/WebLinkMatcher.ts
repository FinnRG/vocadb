import WebLinkCategory from '@Models/WebLinkCategory';
import _ from 'lodash';

export default class WebLinkMatcher {
	public static matchers: WebLinkMatcher[] = [
		{ url: '5sing.kugou.com/', desc: '5SING', cat: WebLinkCategory.Official },
		{ url: 'about.me/', desc: 'about.me', cat: WebLinkCategory.Official },
		{ url: '.akbh.jp/', desc: 'Akiba Hobby', cat: WebLinkCategory.Commercial },
		{
			url: 'www.akibaoo.com/',
			desc: 'Akibaoo',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'alice-books.com/',
			desc: 'Alice Books',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.amazon.co.jp/',
			desc: 'Amazon',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'www.amazon.com/', desc: 'Amazon', cat: WebLinkCategory.Commercial },
		{ url: 'amzn.to/', desc: 'Amazon', cat: WebLinkCategory.Commercial },
		{ url: 'ameblo.jp/', desc: 'Blog', cat: WebLinkCategory.Official },
		{
			url: 'lofter.com/',
			desc: 'Blog on Lofter',
			cat: WebLinkCategory.Official,
		},
		{ url: 'www.amiami.com/', desc: 'AmiAmi', cat: WebLinkCategory.Commercial },
		{ url: 'anidb.net/', desc: 'AniDB', cat: WebLinkCategory.Reference },
		{
			url: 'www.animate-onlineshop.jp/',
			desc: 'Animate Online Shop',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'bandcamp.com', desc: 'Bandcamp', cat: WebLinkCategory.Commercial },
		{ url: 'beatport.com', desc: 'Beatport', cat: WebLinkCategory.Commercial },
		{ url: 'bilibili.com/', desc: 'Bilibili', cat: WebLinkCategory.Official },
		{ url: 'bilibili.tv/', desc: 'Bilibili', cat: WebLinkCategory.Official },
		{ url: 'booth.pm/', desc: 'Booth', cat: WebLinkCategory.Commercial },
		{
			url: 'www.cdjapan.co.jp/detailview.html',
			desc: 'CDJapan',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.cdjapan.co.jp/product/',
			desc: 'CDJapan',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'creofuga.net/', desc: 'Creofuga', cat: WebLinkCategory.Official },
		{
			url: 'd-stage.com/shop/',
			desc: 'D-Stage',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'diverse.direct/',
			desc: 'Diverse Direct',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'deviantart.com/',
			desc: 'DeviantArt',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'www.discogs.com/',
			desc: 'Discogs',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'reference.discogslabs.com/',
			desc: 'Discogs',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'exittunes.com/',
			desc: 'Exit Tunes',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'www.facebook.com/',
			desc: 'Facebook',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'grep-shop.com/',
			desc: 'Grep Shop',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'plus.google.com',
			desc: 'Google Plus',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'shop.fasic.jp/',
			desc: 'fasic',
			cat: WebLinkCategory.Commercial,
		} /* UtaiteDB */,
		{ url: '.web.fc2.com', desc: 'Website', cat: WebLinkCategory.Official },
		{ url: '.fc2.com', desc: 'Blog', cat: WebLinkCategory.Official },
		{
			url: 'play.google.com/',
			desc: 'Google Play',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'instagram.com/', desc: 'Instagram', cat: WebLinkCategory.Official },
		{
			url: 'itunes.apple.com/us/',
			desc: 'iTunes (US)',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'itunes.apple.com/jp/',
			desc: 'iTunes (JP)',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'itunes.apple.com/',
			desc: 'iTunes',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'music.apple.com/us/',
			desc: 'iTunes (US)',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'music.apple.com/jp/',
			desc: 'iTunes (JP)',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'music.apple.com/',
			desc: 'iTunes',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'karent.jp/', desc: 'KarenT', cat: WebLinkCategory.Commercial },
		{ url: 'kkbox.fm/', desc: 'KKBox', cat: WebLinkCategory.Commercial },
		{
			url: 'last.fm/user/',
			desc: 'Last.fm profile',
			cat: WebLinkCategory.Official,
		},
		{ url: 'last.fm/', desc: 'Last.fm', cat: WebLinkCategory.Reference },
		{ url: 'line.me/', desc: 'Line Music', cat: WebLinkCategory.Commercial },
		{
			url: 'listography.com',
			desc: 'Listography',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'listen.jp/store/',
			desc: 'Listen Japan',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.instagram.com/',
			desc: 'Instagram',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'shop.melonbooks.co.jp/',
			desc: 'Melonbooks',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.melonbooks.co.jp/',
			desc: 'Melonbooks',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.metal-archives.com/',
			desc: 'Metal Archives',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'mikumikudance.wikia.com/wiki/',
			desc: 'MikuMikuDance Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'mikumikudance.fandom.com/wiki/',
			desc: 'MikuMikuDance Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'w.atwiki.jp/hmiku/',
			desc: 'MikuWiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'www5.atwiki.jp/hmiku/',
			desc: 'MikuWiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'www.mixcloud.com/',
			desc: 'Mixcloud',
			cat: WebLinkCategory.Official,
		},
		{ url: 'mora.jp/', desc: 'mora', cat: WebLinkCategory.Commercial },
		{ url: 'mqube.net/user/', desc: 'MQube', cat: WebLinkCategory.Official },
		{
			url: 'music-book.jp/',
			desc: 'music.jp',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'musicbrainz.org/',
			desc: 'MusicBrainz',
			cat: WebLinkCategory.Reference,
		},
		{ url: 'mysound.jp/', desc: 'MySound', cat: WebLinkCategory.Commercial },
		{ url: 'www.muzie.ne.jp/', desc: 'Muzie', cat: WebLinkCategory.Official },
		{
			url: 'myfigurecollection.net/',
			desc: 'MyFigureCollection',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'music.163.com/#/user/home',
			desc: 'NCM User Homepage',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'music.163.com/#/artist',
			desc: 'NCM Artist Entry',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'music.163.com/#/album',
			desc: 'NCM Album Release',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'music.163.com/#/song',
			desc: 'NCM Song Release',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'musicstore.sg/',
			desc: 'Singtel musicStore',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'chokuhan.nicovideo.jp/',
			desc: 'NicoNico Chokuhan',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'dic.nicovideo.jp/',
			desc: 'NicoNicoPedia',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'nicovideo.jp/user/',
			desc: 'NND Account',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'com.nicovideo.jp/community/',
			desc: 'NND Community',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'nicovideo.jp/mylist/',
			desc: 'NND MyList',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'nicovideo.jp/tag/',
			desc: 'NND Tag',
			cat: WebLinkCategory.Reference,
		},
		{ url: 'oricon.co.jp/', desc: 'Oricon', cat: WebLinkCategory.Commercial },
		{ url: 'ototoy.jp/', desc: 'Ototoy', cat: WebLinkCategory.Commercial },
		{
			url: 'otoyapage.jp/user/',
			desc: 'Otoya Page',
			cat: WebLinkCategory.Official,
		},
		{ url: 'www.patreon.com/', desc: 'Patreon', cat: WebLinkCategory.Official },
		{ url: 'piapro.jp/', desc: 'Piapro', cat: WebLinkCategory.Official },
		{ url: 'poppro.cn/', desc: 'Poppro', cat: WebLinkCategory.Official },
		{ url: 'potune.jp/', desc: 'Potune', cat: WebLinkCategory.Commercial },
		{ url: 'www.pixiv.net/', desc: 'Pixiv', cat: WebLinkCategory.Official },
		{
			url: 'books.rakuten.co.jp/',
			desc: 'Rakuten',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'skeb.jp/', desc: 'Skeb', cat: WebLinkCategory.Commercial },
		{ url: 'spotify.com/', desc: 'Spotify', cat: WebLinkCategory.Commercial },
		{
			url: 'soundcloud.com/',
			desc: 'SoundCloud',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'www.suruga-ya.jp/',
			desc: 'Suruga-ya',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'synthv.fandom.com/wiki/',
			desc: 'SynthV Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'tanocstore.net/',
			desc: 'TANO*C STORE',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'item.taobao.com/item.htm',
			desc: 'Taobao',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.lagoa.jp/',
			desc: 'THREE!',
			cat: WebLinkCategory.Commercial,
		} /* UtaiteDB */,
		{ url: '.taobao.com', desc: 'Taobao', cat: WebLinkCategory.Commercial },
		{
			url: 'thwiki.cc/',
			desc: 'THBWiki',
			cat: WebLinkCategory.Reference,
		} /* TouhouDB */,
		{
			url: 'toranoana.jp/mailorder/article/',
			desc: 'Toranoana',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'toranoana.shop/',
			desc: 'Toranoana',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'touhoudb.com/', desc: 'TouhouDB', cat: WebLinkCategory.Reference },
		{
			url: 'tower.com/',
			desc: 'Tower Records',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'tower.jp/',
			desc: 'Tower Records',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'en.touhouwiki.net/wiki/',
			desc: 'Touhou Wiki',
			cat: WebLinkCategory.Reference,
		},
		{ url: 'tumblr.com/', desc: 'Tumblr', cat: WebLinkCategory.Official },
		{ url: 'twitter.com/', desc: 'Twitter', cat: WebLinkCategory.Official },
		{ url: 'twipla.jp/', desc: 'TwiPla', cat: WebLinkCategory.Official },
		{ url: 'utaitedb.net/', desc: 'UtaiteDB', cat: WebLinkCategory.Reference },
		{
			url: 'utaulyrics.wikia.com/wiki/',
			desc: 'UTAU Lyrics Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'utaulyrics.fandom.com/wiki/',
			desc: 'UTAU Lyrics Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'w.atwiki.jp/utauuuta/',
			desc: 'UTAU Wiki (JP)',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'www24.atwiki.jp/utauuuta/',
			desc: 'UTAU Wiki (JP)',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'utau.wikia.com/wiki/',
			desc: 'UTAU Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'utau.fandom.com/wiki/',
			desc: 'UTAU Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'utau.wikidot.com/',
			desc: 'UTAU wiki 2.0',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'utau.wiki/',
			desc: 'UTAU wiki 2.0',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'utaite.wikia.com/',
			desc: 'Utaite Wiki',
			cat: WebLinkCategory.Reference,
		} /* UtaiteDB */,
		{
			url: 'utaite.fandom.com/',
			desc: 'Utaite Wiki',
			cat: WebLinkCategory.Reference,
		} /* UtaiteDB */,
		{ url: 'vgmdb.net/', desc: 'VGMdb', cat: WebLinkCategory.Reference },
		{
			url: 'vvstore.jp/',
			desc: 'Village Vanguard',
			cat: WebLinkCategory.Commercial,
		},
		{ url: 'vimeo.com/', desc: 'Vimeo', cat: WebLinkCategory.Official },
		{ url: '://vk.com/', desc: 'VK', cat: WebLinkCategory.Official },
		{ url: 'vocadb.net/', desc: 'VocaDB', cat: WebLinkCategory.Reference },
		{
			url: 'vocaloiders.com/',
			desc: 'Vocaloiders',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'vocaloidlyrics.wikia.com/wiki/',
			desc: 'Vocaloid Lyrics Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'vocaloidlyrics.fandom.com/wiki/',
			desc: 'Vocaloid Lyrics Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'vocaloid.wikia.com/wiki/',
			desc: 'Vocaloid Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'vocaloid.fandom.com/wiki/',
			desc: 'Vocaloid Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'voiceroid.wikia.com/wiki/',
			desc: 'Voiceroid Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'voiceroid.fandom.com/wiki/',
			desc: 'Voiceroid Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'cevio.wikia.com/wiki/',
			desc: 'CeVIO Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'cevio.fandom.com/wiki/',
			desc: 'CeVIO Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'alterego.wikia.com/wiki/',
			desc: 'Alter/Ego Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'alterego.fandom.com/wiki/',
			desc: 'Alter/Ego Wiki',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'www.vocaloid.com/products/',
			desc: 'VOCALOID SHOP (JPN)',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.vocaloid.com/en/products/',
			desc: 'VOCALOID SHOP (ENG)',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'vocalotracks.ssw.co.jp/',
			desc: 'Vocalotracks',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'www.vocallective.net/',
			desc: 'Vocallective',
			cat: WebLinkCategory.Official,
		},
		{ url: 'weibo.com/', desc: 'Weibo', cat: WebLinkCategory.Official },
		{
			url: 'en.wikipedia.org/wiki/',
			desc: 'Wikipedia (EN)',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'ja.wikipedia.org/wiki/',
			desc: 'Wikipedia (JP)',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'wikipedia.org/wiki/',
			desc: 'Wikipedia',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'zh.moegirl.org/',
			desc: 'Moegirlpedia (zh-cn)',
			cat: WebLinkCategory.Reference,
		},
		{
			url: 'en.moegirl.org/',
			desc: 'Moegirlpedia (EN)',
			cat: WebLinkCategory.Reference,
		},
		{ url: 'wixsite.com/', desc: 'Website', cat: WebLinkCategory.Official },
		{
			url: 'www.yesasia.com/',
			desc: 'YesAsia',
			cat: WebLinkCategory.Commercial,
		},
		{
			url: 'youtube.com/channel/',
			desc: 'YouTube Channel',
			cat: WebLinkCategory.Official,
		},
		{
			url: 'youtube.com/user/',
			desc: 'YouTube Channel',
			cat: WebLinkCategory.Official,
		},
	];

	private static isMatch(url: string, item: WebLinkMatcher): boolean {
		return url.indexOf(item.url) !== -1;
	}

	public static matchWebLink(url: string): WebLinkMatcher {
		return _.find(WebLinkMatcher.matchers, (item) => this.isMatch(url, item))!;
	}

	public constructor(
		public url: string,
		public desc: string,
		public cat: WebLinkCategory,
	) {}
}
