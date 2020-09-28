const myWords = ['no filter', 'just saying', 'winning', 'yolo'];

const bannedHashtags = new Set(myWords);
console.log(bannedHashtags);

bannedHashtags.add('bestlife');
bannedHashtags.add('yolo').add('selfie');
console.log(bannedHashtags);

console.log(bannedHashtags.has('yolo'));
console.log(bannedHashtags.has('tbt'));

bannedHashtags.delete('winning');
console.log(bannedHashtags);

bannedHashtags.add('winning');

function filterHashTags(tags) {
	const bannedHashTags = new Set(myWords);
	return tags.filter((tag) => !bannedHashtags.has(tag));
}

const susansTags = ['happymonday', 'yolo', 'winning', 'sunset'];
console.log(filterHashTags(susansTags));

bannedHashtags.clear();
console.log(bannedHashtags);
