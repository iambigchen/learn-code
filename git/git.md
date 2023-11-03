```js
> git log
// 可以看到提交日志，拿到commitId后，执行git reset --hard commitId即可回退到那个commit版本

> git reflog
// 通过回退后，回退版本之后的版本就会在git log中去除，所以想要再恢复到这些版本，拿到该版本的办法是 git reflog

> git reset HEAD fileName
// 如果修改了文件，并且已经add到暂存区了，需要撤销暂存区的东西到工作区，执行该命令

> git checkout -- fileName
// 如果工作区修改了代码，但是想恢复到之前的版本，执行该方法
// 如果该文件暂存区有，则会恢复到暂存区
// 如果暂存区没有，则会恢复到最后一次commit版本
```



#### 远程版本库

```js
> ssh-keygen -t rsa -C "imbigchen@163.com"
// 在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell,执行生成密钥的指令
// id_rsa为私钥，id_rsa.pub为公钥， 在远程库添加ssh key地方粘贴该公钥

> git remote add origin git@github.com:iambigchen/learngit.git
// 远程仓库和本地仓库关联，用该命令

> git push -u origin master
// 将本地的代码推到远程仓库master分支，第一次推需要加-u ，后期直接执行git push  origin master
```



#### 分支管理

```js
> git checkout -b dev
// 创建dev封装，检出，并切到dev分支 -b是创建并切换 
// 相当于 git branch dev  git checkout dev

> git merge dev
// 在当前分支，将dev合并到当前分支，如果有冲突，需要先手动解决冲突，才能合并

> git merge --no-ff -m "merge with no-ff" dev

// 在当前分支，将dev分支以非快速模式合并到当前分支
// --no-ff 非快速模式，和快速模式的区别是，该模式合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
// git merge --squash dev 将dev的commit压缩，再合并
  
> git branch
// 查看当前所在分支

> git branch -d dev
// 删除dev分支

> git branch -D dev
// 强制删除dev分支

> git log --graph
// 查看分支合并图

> git stash
// 将本地没有commit的代码，stash住，之后修复完其他问题后，再取出stash中的代码即可

> git stash list
// 查看本地的stash记录

> git stash apply
// 恢复stash，但不删除stash内容

> git stash drop
// 删除stash内容

> git stash pop
// 恢复stash，删除stash内容

> git stash apply stash@{0}
// 选择版本取出

> git remote
// 查看远程库信息 git remote -v看更详细的信息

> git push origin dev
// 将本地的dev分支推送到远程的dev上，即origin/dev分支上

> git branch -a
// 可以看到本地和远程所有的库

> git checkout -b dev origin/dev
// 另外一个人创建了dev分支，想要在我的本地也有dev分支，执行该命令,即可创建了dev分支，并且是从origin/dev中创建的

> git pull
// 从远程库拉取最新代码
// 在pull之前，需要先和远程该分支建立连接 git branch --set-upstream-to=origin/dev dev
```



#### 标签

```js
> git tag 1.0
// 创建了一个1.0的标签

> git tag
// 查看所有标签

> git show 1.0
// 查看某个标签的详细信息

> git tag -a v0.1 -m "version 0.1 released" 1094adb
// 将commitId为1094adb的提交，打一个标签为v0.1,标签信息为version 0.1 released

注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

> git tag -d v1.0
// 删除标签v1.0

> git push origin v1.0
// 将标签v1.0推送到远程

> git push origin --tags
// 将所有的标签推到远程

> git tag -d v0.9
> git push origin :refs/tags/v0.9
// 删除远程的v0.9标签，需要先将本地的v0.9删除，然后执行推送
```



#### 远程库

```js
> sudo git init --bare sample.git
// 在当前文件夹里建一个sample裸库

> git remote rm origin
> git remote add github git@github.com:michaelliao/learngit.git
> git remote add gitee git@gitee.com:liaoxuefeng/learngit.git
// 一个项目想关联多个git远程库，则需要先将本地已经关联的git库删除（因为git默认远程库都将origin）
// 然后分别关联各个远程库，一个叫github，另外一个是gitee（名字自取）
// git push时，改成git push github master和git push gitee master
```



#### 指令的别名

```js
> git config --global alias.st status
// 全局将st设为status的别名，不加global则只是当前git库操作

> git config --global alias.unstage 'reset HEAD'
// 这样执行git unstage test.py实际操作 git reset HEAD test.py
```

