const W = window

function addLocalStory (story) {
		console.log('story.index='+story.index)
  let storyIndex = W.localStorage.getItem(`${story.index}`)
  console.log('storyIndex='+storyIndex)
  if (!story) {
    return
  } else if (storyIndex !== null) {
    return
  } else {
  	if(!W.localStorage.getItem("favotite")){
  	  W.localStorage.setItem(`favotite`,'')
  	}
  	let str = W.localStorage.getItem("favotite");
  		let arr=str.split('}')
  		console.log(arr)
  		arr.push(story)
    W.localStorage.setItem(`favotite`, `${JSON.stringify(arr)}`)
  }
  return `${story.id} is added`
}
function removeLocalStory (story) {
	console.log('story='+story)
	console.log('storyid='+story.id)
  W.localStorage.removeItem(`${'' + story.id}`)
  return `${story.id} is removed`
}
function totalLocalStoryNum () {
  return W.localStorage.length
}
function clearLocalStories () {
  W.localStorage.clear()
  return '清除完成'
}
export {addLocalStory, removeLocalStory, totalLocalStoryNum, clearLocalStories}