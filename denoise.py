import sys, cv2
img = cv2.imread(sys.argv[1])
dst = cv2.fastNlMeansDenoising(img,None,sys.argv[2],sys.argv[3],sys.argv[4])
cv2.imwrite(sys.argv[1],dst)