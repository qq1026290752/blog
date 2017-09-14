//用户对象
function User(id,userName,passWord,email,imgesUrl,phoneNum){
	this.id = id;
	this.userName = userName;
	this.passWord = passWord;
	this.email = email,
	this.imgesUrl=imgesUrl,
	this.phoneNum=phoneNum
}
/**
  * 分页
  *
  **/
function Pagination(startPags,pageSize){
	this.startPags = startPags;
	this.pageSize = pageSize;
}
//文章对象
function Article(articleId,articleTitle,articleAuthor,content,label,articleImageUrl,articleType,articleStatus,catalogPid,catalogId){
	this.articleId = articleId;
	this.articleTitle = articleTitle;
	this.articleAuthor = articleAuthor;
	this.content = content;
	this.label = label;
	this.articleImageUrl = articleImageUrl
	this.articleType = articleType;
	this.articleStatus = articleStatus;
	this.catalogPid = catalogPid;
	this.catalogId = catalogId
}
function Roet(){

}
//微信按钮对象
function WxButton(id,name,type,key,url,appid,pagepath,pid,oreder){
	this.id = id;
	this.name = name,
	this.type = type;
	this.key = key;
	this.url = url;
	this.appid = appid;
	this.pagepath = pagepath ; 
	this.pid = pid;
	this.oreder= oreder;
}
//文章目录对象
function Catalogue(catalogId,catalogName,catalogAlias,catalogParentId,isDisplay,catalogContext){
	this.catalogId = catalogId;
	this.catalogName = catalogName;
	this.catalogAlias = catalogAlias;
	this.catalogParentId = catalogParentId;
	this.isDisplay = isDisplay;
	this.catalogContext = catalogContext;
}
function Comment(commentId,userName,userEmail,userUrl,commentContent,commentType,articleId){
	this.commentId = commentId ; 
	this.userName = userName;
	this.userEmail = userEmail;
	this.userUrl = userUrl;
	this.commentContent = commentContent;
	this.commentType = commentType;
	this.articleId = articleId;
}
module.exports={
	User,
	Pagination,
	Article,
	WxButton,
	Catalogue,
	Comment
}