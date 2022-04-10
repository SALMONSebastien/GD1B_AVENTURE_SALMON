
    

function playerControls(player,cursors) {

    if (this.lampUsed == false)
        if (isConnected == false)
            if (this.gameOver) { return; }
                if (cursors.left.isDown) { //si la touche gauche est appuyée
                    player.setVelocityX(-250); //alors vitesse négative en X
                    player.anims.play('left', true); //et animation => gauche
                }

                else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
                    player.setVelocityX(250); //alors vitesse positive en X
                    player.anims.play('right', true); //et animation => droite
                }

            
                else if (cursors.up.isDown) {
                    //si touche haut appuyée ET que le perso touche le sol
                    player.setVelocityY(-200); //alors vitesse verticale négative
                    player.anims.play('up', true); //et animation => haut

                }


                else if (cursors.down.isDown) {
                    //si touche haut appuyée ET que le perso touche le sol
                    player.setVelocityY(200); //alors vitesse verticale négative
                    player.anims.play('down', true); //et animation => bas

                }

                else { // sinon
                    player.setVelocityX(0); //vitesse nulle
                    player.setVelocityY(0); //vitesse nulle
                    player.anims.play('downIdle'); //animation fait face caméra
                    
                }

    

    if (this.lampUsed == true)
    if (isConnected == false)
        if (this.gameOver) { return; }
            if (cursors.left.isDown) { //si la touche gauche est appuyée
                player.setVelocityX(-250); //alors vitesse négative en X
                player.anims.play('left', true); //et animation => gauche
            }

            else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
                player.setVelocityX(250); //alors vitesse positive en X
                player.anims.play('right', true); //et animation => droite
            }

        
            else if (cursors.up.isDown) {
                //si touche haut appuyée ET que le perso touche le sol
                player.setVelocityY(-200); //alors vitesse verticale négative
                player.anims.play('up', true); //et animation => haut

            }


            else if (cursors.down.isDown) {
                //si touche haut appuyée ET que le perso touche le sol
                player.setVelocityY(200); //alors vitesse verticale négative
                player.anims.play('down', true); //et animation => bas

            }

            else { // sinon
                player.setVelocityX(0); //vitesse nulle
                player.setVelocityY(0); //vitesse nulle
                player.anims.play('downIdle'); //animation fait face caméra
                
            }
}


// function playerControlsGamepad(player,gamepad) {

//     if (this.lampUsed == false)
//         if (isConnected == true)
//             if (this.gameOver) { return; }
//                 if (gamepad.leftStick.x < 0) { //si la touche gauche est appuyée
//                     player.setVelocityX(-250); //alors vitesse négative en X
//                     //player.anims.play('left', true); //et animation => gauche
            //    }
//                 else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
//                     player.setVelocityX(250); //alors vitesse positive en X
//                     //player.anims.play('right', true); //et animation => droite
//                 }
            
//                 else if (cursors.up.isDown) {
//                     //si touche haut appuyée ET que le perso touche le sol
//                     player.setVelocityY(-200); //alors vitesse verticale négative
//                     //(on saute)
//                 }

//                 else if (cursors.down.isDown) {
//                     //si touche haut appuyée ET que le perso touche le sol
//                     player.setVelocityY(200); //alors vitesse verticale négative
//                     //(on saute)
//                 }

//                 else { // sinon
//                     player.setVelocityX(0); //vitesse nulle
//                     player.setVelocityY(0); //vitesse nulle
//                     //player.anims.play('turn'); //animation fait face caméra
                    
//                 }

    

//     if (this.lampUsed == true)
//         if (isConnected == true)
//             if (this.gameOver) { return; }
//                 if (cursors.left.isDown) { //si la touche gauche est appuyée
//                     player.setVelocityX(-250); //alors vitesse négative en X
//                     //player.anims.play('left', true); //et animation => gauche

                
//                 }
//                 else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
//                     player.setVelocityX(250); //alors vitesse positive en X
//                     //player.anims.play('right', true); //et animation => droite

//                 }
            
//                 else if (cursors.up.isDown) {
//                     //si touche haut appuyée ET que le perso touche le sol
//                     player.setVelocityY(-200); //alors vitesse verticale négative
//                     //(on saute)
//                 }

//                 else if (cursors.down.isDown) {
//                     //si touche haut appuyée ET que le perso touche le sol
//                     player.setVelocityY(200); //alors vitesse verticale négative
//                     //(on saute)
//                 }

//                 else { // sinon
//                     player.setVelocityX(0); //vitesse nulle
//                     player.setVelocityY(0); //vitesse nulle
//                     //player.anims.play('turn'); //animation fait face caméra
//                 }
//}
